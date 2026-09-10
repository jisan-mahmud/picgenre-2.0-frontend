import { axiosPrivate } from '../api_call/axiosInstance'

const CONVERSION_ENDPOINT = '/v1/convert/eps-to-jpg/'
const MAX_RETRIES = 1
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function convertEpsToJpg(file, maxRetries = MAX_RETRIES) {
  let lastError = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0) await wait(800 * attempt)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axiosPrivate.post(CONVERSION_ENDPOINT, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      })

      const blob = new Blob([response.data], { type: 'image/jpeg' })
      const jpgName = file.name.replace(/\.eps$/i, '.jpg')
      return new File([blob], jpgName, { type: 'image/jpeg' })
    } catch (error) {
      const status = error?.response?.status
      let message = 'EPS conversion failed'

      if (status === 401) {
        message = 'EPS conversion failed: authentication error. Please log in again.'
      } else if (status === 413) {
        message = 'EPS conversion failed: file too large.'
      } else if (status === 500 || status === 502 || status === 503) {
        message = 'EPS conversion failed: server error. Try again later.'
      } else if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED' || /timeout|network|econnreset|fetch failed/i.test(String(error?.message))) {
        message = 'EPS conversion failed: server unreachable. Check your connection.'
      } else {
        message = `EPS conversion failed: ${error?.message || 'unknown error'}`
      }

      lastError = new Error(message)
      if (attempt >= maxRetries) break
    }
  }

  throw lastError
}
