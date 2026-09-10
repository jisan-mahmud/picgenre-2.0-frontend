const escapeCsvField = (value) => {
  const str = String(value ?? '')
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function generateCSV(files) {
  const headers = ['Filename', 'Title', 'Tags', 'Description', 'Platform']
  const rows = files.map((file) => [
    file.name,
    file.title,
    Array.isArray(file.tags) ? file.tags.join(', ') : file.tags,
    file.description,
    file.platform,
  ])
  const lines = [headers, ...rows].map((row) => row.map(escapeCsvField).join(','))
  return lines.join('\n')
}

export function downloadCSV(csvString, filename = 'metadata.csv') {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}