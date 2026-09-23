import { GoogleGenAI, Type } from '@google/genai'
import { prepareImageForGemini } from './geminiUtils'

export const PLATFORMS = {
  'Adobe Stock': {
    minKeywords: 5,
    maxKeywords: 50,
    minTitleWords: 3,
    maxTitleWords: 10,
    titleMaxLength: 70,
    title: true,
    description: false,
    hint: 'Write the title as a plain-language caption describing subject, action and context.',
  },
  Shutterstock: {
    minKeywords: 7,
    maxKeywords: 50,
    minTitleWords: 5,
    maxTitleWords: 15,
    titleMaxLength: 2048,
    title: false,
    description: true,
    descriptionMaxLength: 2048,
    hint: 'Description must double as the title — a complete, descriptive sentence of at least 5 words, never a keyword list.',
  },
  Magnific: {
    minKeywords: 5,
    maxKeywords: 50,
    minTitleWords: 3,
    maxTitleWords: 10,
    titleMaxLength: 100,
    title: true,
    description: false,
    hint: 'Title must be unique across the portfolio and describe the asset clearly. Tags must be singular, single-concept English words.',
  },
  Vecteezy: {
    minKeywords: 10,
    maxKeywords: 50,
    minTitleWords: 3,
    maxTitleWords: 10,
    titleMaxLength: 200,
    title: true,
    description: true,
    hint: 'Keep description clear and factual, avoid keyword stuffing.',
  },
  '123rf': {
    minKeywords: 7,
    maxKeywords: 50,
    minTitleWords: 3,
    maxTitleWords: 10,
    titleMaxLength: 180,
    title: false,
    description: true,
    descriptionMaxLength: 180,
    hint: 'Short factual description of the image, no brand names or trademarks.',
  },
  Pond5: {
    minKeywords: 40,
    maxKeywords: 50,
    minTitleWords: 3,
    maxTitleWords: 10,
    titleMaxLength: 200,
    title: true,
    description: true,
    hint: 'Title should convey exactly what is depicted. Description should include time, location, and scene details.',
  },
  Dreamstime: {
    minKeywords: 7,
    maxKeywords: 50,
    minTitleWords: 3,
    maxTitleWords: 10,
    titleMaxLength: 250,
    title: true,
    description: true,
    hint: 'Detailed description that clearly depicts the image content; title must be a descriptive caption.',
  },
}

export const DEFAULT_PLATFORM = 'Adobe Stock'

const MODEL = 'models/gemini-3.5-flash-lite'
const MAX_RETRIES = 1
const REQUEST_TIMEOUT_MS = 45 * 1000

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let cachedClient = null
let cachedClientKey = null

function getClient(apiKey) {
  if (!cachedClient || cachedClientKey !== apiKey) {
    cachedClient = new GoogleGenAI({ apiKey })
    cachedClientKey = apiKey
  }
  return cachedClient
}

export function extractJson(text) {
  if (!text) throw new Error('Empty response from Gemini')
  const trimmed = String(text).trim()

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = (fenced ? fenced[1] : trimmed).trim()

  try {
    return JSON.parse(candidate)
  } catch {
    const start = candidate.indexOf('{')
    const end = candidate.lastIndexOf('}')
    if (start !== -1 && end > start) {
      return JSON.parse(candidate.slice(start, end + 1))
    }
    throw new Error('Invalid JSON response from Gemini')
  }
}

function isRetryable(error) {
  const code = error?.status || error?.statusCode
  if ([429, 500, 502, 503, 504].includes(code)) return true
  const message = String(error?.message || '')
  if (/429|500|502|503|504|RESOURCE_EXHAUSTED|rate limit|quota|network|econnreset|fetch failed|timed out|aborted/i.test(message)) {
    return true
  }
  return false
}

function formatGeminiError(error, keySource) {
  const raw = String(error?.message || error || '')
  const code = error?.status || error?.statusCode

  if (code === 429 || /RESOURCE_EXHAUSTED|quota exceeded|rate limit/i.test(raw)) {
    return keySource === 'user'
      ? 'Your API quota limit has been reached. Try again later or check your own key in Settings -> AI Models.'
      : 'System is currently overloaded — file processing can be slow. Please try again in a few minutes.'
  }
  if (code === 401 || /api.?key|invalid.?key|permission.?denied/i.test(raw)) {
    return 'Invalid Gemini API key. Add your own key in Settings -> AI Models or upgrade your plan.'
  }
  if (code === 403) {
    return 'Gemini API access denied. Check your API key permissions.'
  }
  if (/timed out|aborted/i.test(raw)) {
    return `Request timed out after ${Math.round(REQUEST_TIMEOUT_MS / 1000)}s.`
  }
  if (/network|econnreset|fetch failed|ERR_NETWORK/i.test(raw)) {
    return 'Network error. Check your internet connection.'
  }

  const short = raw.length > 120 ? raw.slice(0, 120) + '...' : raw
  return short || 'Gemini API error.'
}

function buildPrompt(platform, customPrompt, mimeType) {
  const { minKeywords, maxKeywords, minTitleWords, maxTitleWords, title, description, descriptionMaxLength, hint } = platform

  const parts = []
  if (title) {
    parts.push(`Title: ${minTitleWords}-${maxTitleWords} words, no symbols or colons.`)
  }
  parts.push(`Keyword tags: ${minKeywords}-${maxKeywords} tags.`)
  if (description) {
    let desc = 'Description: 1-3 sentences.'
    if (descriptionMaxLength) desc += ` Keep it under ${descriptionMaxLength} characters.`
    parts.push(desc)
  }
  if (hint) parts.push(hint)
  if (mimeType === 'image/png') parts.push('Transparent background.')
  if (customPrompt) parts.push(customPrompt)

  return parts.join(' ')
}

function buildSchema(platform, minTitleWords, maxTitleWords, minKeywords, maxKeywords) {
  const { title, description } = platform

  const properties = {}
  const required = []

  if (title) {
    properties.title = {
      type: Type.STRING,
      description: `Title, ${minTitleWords}-${maxTitleWords} words, no symbols/colons`,
    }
    required.push('title')
  }
  properties.tags = {
    type: Type.ARRAY,
    description: `${minKeywords}-${maxKeywords} keyword tags`,
    items: { type: Type.STRING },
  }
  required.push('tags')
  if (description) {
    properties.description = {
      type: Type.STRING,
      description: 'Image description',
    }
    required.push('description')
  }

  return { type: Type.OBJECT, properties, required }
}

export async function analyzeImage(imageFile, platform, customPrompt, apiKey, settings = {}, keySource = null, maxRetries = MAX_RETRIES) {
  const { base64, mimeType } = await prepareImageForGemini(imageFile)
  const base = PLATFORMS[platform] || PLATFORMS[DEFAULT_PLATFORM]
  const cfg = { ...base, ...settings }

  const ai = getClient(apiKey)
  const prompt = buildPrompt(cfg, customPrompt, mimeType)
  const responseSchema = buildSchema(cfg, cfg.minTitleWords, cfg.maxTitleWords, cfg.minKeywords, cfg.maxKeywords)

  let lastError = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    try {
      if (attempt > 0) await wait(800 * attempt)

      const result = await ai.models.generateContent({
        model: MODEL,
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: base64,
                },
              },
              { text: prompt },
            ],
          },
        ],
        config: {
          responseMimeType: 'application/json',
          responseSchema,
        },
        abortSignal: controller.signal,
      })

      const data = extractJson(result.text)
      return {
        title: data.title || '',
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        description: data.description || '',
      }
    } catch (error) {
      const err = controller.signal.aborted
        ? new Error(`Request timed out after ${Math.round(REQUEST_TIMEOUT_MS / 1000)}s`)
        : new Error(formatGeminiError(error, keySource))
      lastError = err
      if (!isRetryable(error) || attempt >= maxRetries) {
        throw err
      }
    } finally {
      clearTimeout(timer)
    }
  }

  throw lastError
}