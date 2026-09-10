import { GoogleGenAI, Type } from '@google/genai'
import { prepareImageForGemini } from './geminiUtils'

export const PLATFORMS = {
  'Adobe Stock': {
    minKeywords: 5,
    maxKeywords: 50,
    minTitleWords: 3,
    maxTitleWords: 10,
    titleMaxLength: 200,
  },
  Freepik: {
    minKeywords: 5,
    maxKeywords: 50,
    minTitleWords: 3,
    maxTitleWords: 10,
    titleMaxLength: 100,
  },
  Shutterstock: {
    minKeywords: 5,
    maxKeywords: 50,
    minTitleWords: 3,
    maxTitleWords: 10,
    titleMaxLength: 200,
  },
}

export const DEFAULT_PLATFORM = 'Adobe Stock'

const MODEL = 'models/gemini-3.6-flash'
const MAX_RETRIES = 2
const REQUEST_TIMEOUT_MS = 90 * 1000

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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

export async function analyzeImage(imageFile, platform, customPrompt, apiKey, settings = {}, maxRetries = MAX_RETRIES) {
  const { base64, mimeType } = await prepareImageForGemini(imageFile)
  const base = PLATFORMS[platform] || PLATFORMS[DEFAULT_PLATFORM]
  const { minKeywords, maxKeywords, minTitleWords, maxTitleWords } = { ...base, ...settings }

  const ai = new GoogleGenAI({ apiKey })

  const prompt =
    'Analyze this image and return metadata as valid JSON.\n' +
    `Rules:\n` +
    `- "title": descriptive, exactly ${minTitleWords}-${maxTitleWords} words, no symbols, no colons\n` +
    `- "tags": array of ${minKeywords}-${maxKeywords} relevant keyword strings\n` +
    `- "description": 1-3 sentence description of the image\n` +
    (mimeType === 'image/png' ? '- The image has a transparent background\n' : '') +
    (customPrompt ? `${customPrompt}\n` : '') +
    'Return ONLY the JSON object with title, tags, description fields.'

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
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: `Descriptive title (exactly ${minTitleWords}-${maxTitleWords} words, no symbols, no colons)`,
              },
              tags: {
                type: Type.ARRAY,
                description: 'Relevant tags for the image',
                items: { type: Type.STRING },
              },
              description: {
                type: Type.STRING,
                description: 'Describe image',
              },
            },
            required: ['title', 'tags', 'description'],
          },
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
        : error
      lastError = err
      if (!isRetryable(err) || attempt >= maxRetries) {
        throw err
      }
    } finally {
      clearTimeout(timer)
    }
  }

  throw lastError
}