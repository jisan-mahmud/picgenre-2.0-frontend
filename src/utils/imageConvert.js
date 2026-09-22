import { convertEpsToImage } from './convertEps'

export const SOURCE_FORMATS = ['JPEG', 'PNG', 'WebP', 'BMP', 'GIF', 'SVG', 'AVIF', 'ICO', 'EPS']
export const TARGET_FORMATS = ['PNG', 'JPEG', 'WebP']

export const FORMAT_EXTENSIONS = {
  JPEG: ['jpg', 'jpeg'],
  PNG: ['png'],
  WebP: ['webp'],
  BMP: ['bmp'],
  GIF: ['gif'],
  SVG: ['svg'],
  AVIF: ['avif'],
  ICO: ['ico'],
  EPS: ['eps'],
}

export const TARGET_MIME = {
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  WebP: 'image/webp',
}

const fileToImage = (file) => new Promise((resolve, reject) => {
  const url = URL.createObjectURL(file)
  const image = new Image()
  image.onload = () => {
    URL.revokeObjectURL(url)
    resolve(image)
  }
  image.onerror = () => {
    URL.revokeObjectURL(url)
    reject(new Error('Failed to load image. The file may be corrupt or its format is not supported by your browser.'))
  }
  image.src = url
})

const decodeToCanvas = async (file) => {
  if (!/image\/(svg\+xml|webp|avif|vnd\.microsoft\.icon|gif|netbmp)/.test(file.type || '') && file.type) {
    try {
      const bitmap = await createImageBitmap(file)
      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      canvas.getContext('2d').drawImage(bitmap, 0, 0)
      bitmap.close()
      return canvas
    } catch {
      // fall through to <img> decoding
    }
  }
  const image = await fileToImage(file)
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth || image.width
  canvas.height = image.naturalHeight || image.height
  canvas.getContext('2d').drawImage(image, 0, 0)
  return canvas
}

const encodeCanvas = (canvas, targetFormat, { quality, background }) => {
  const mime = TARGET_MIME[targetFormat]
  const hasAlpha = mime !== 'image/jpeg'

  if (!hasAlpha && background) {
    const flat = document.createElement('canvas')
    flat.width = canvas.width
    flat.height = canvas.height
    const ctx = flat.getContext('2d')
    ctx.fillStyle = background
    ctx.fillRect(0, 0, flat.width, flat.height)
    ctx.drawImage(canvas, 0, 0)
    canvas = flat
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error(`Your browser does not support ${targetFormat} encoding.`))
          return
        }
        resolve(blob)
      },
      mime,
      quality
    )
  })
}

export async function convertImage(file, targetFormat, options = {}) {
  const { quality = 0.85, background = '' } = options
  const canvas = await decodeToCanvas(file)
  const blob = await encodeCanvas(canvas, targetFormat, { quality, background })

  const ext = targetFormat === 'JPEG' ? 'jpg' : targetFormat.toLowerCase()
  const baseName = file.name.replace(/\.[^.]+$/, '')
  return new File([blob], `${baseName}.${ext}`, { type: TARGET_MIME[targetFormat] })
}

export async function convertFile(file, targetFormat, options = {}) {
  const ext = (file.name.split('.').pop() || '').toLowerCase()
  if (ext === 'eps') {
    const target = targetFormat === 'PNG' ? 'png' : 'jpg'
    return convertEpsToImage(file, target)
  }
  return convertImage(file, targetFormat, options)
}

export function detectSourceFormat(fileName) {
  const ext = (fileName.split('.').pop() || '').toLowerCase()
  for (const [format, exts] of Object.entries(FORMAT_EXTENSIONS)) {
    if (exts.includes(ext)) return format
  }
  return null
}