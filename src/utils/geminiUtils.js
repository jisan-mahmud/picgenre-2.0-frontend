const MAX_DIMENSION = 1280

const readAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(reader.result)
  reader.onerror = () => reject(new Error('Failed to read file'))
  reader.readAsDataURL(file)
})

const toBase64 = (dataUrl) => dataUrl.split(',')[1]

export async function prepareImageForGemini(file, maxDimension = MAX_DIMENSION) {
  const mimeType = file.type || 'image/jpeg'
  const supported = ['image/jpeg', 'image/png', 'image/webp']
  const isSmallEnough = file.size <= 1024 * 1024

  if (!supported.includes(mimeType) || isSmallEnough) {
    const dataUrl = await readAsDataUrl(file)
    return { base64: toBase64(dataUrl), mimeType }
  }

  const objectUrl = URL.createObjectURL(file)

  try {
    const img = await new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error('Failed to load image'))
      image.src = objectUrl
    })

    const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
    if (scale >= 1) {
      const dataUrl = await readAsDataUrl(file)
      return { base64: toBase64(dataUrl), mimeType }
    }

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(img.width * scale)
    canvas.height = Math.round(img.height * scale)
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)

    const outMime = mimeType === 'image/png' ? 'image/png' : 'image/jpeg'
    const outDataUrl = canvas.toDataURL(outMime, 0.9)
    return { base64: toBase64(outDataUrl), mimeType: outMime }
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}