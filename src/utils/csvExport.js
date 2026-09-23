const joinKeywords = (tags) => (Array.isArray(tags) ? tags.join(', ') : tags ?? '')

const PLATFORM_EXPORTS = {
  'Adobe Stock': {
    headers: ['Filename', 'Title', 'Keywords'],
    separator: ',',
    map: (f) => [f.name, f.title, joinKeywords(f.tags)],
  },
  Shutterstock: {
    headers: ['Filename', 'Description', 'Keywords', 'Categories'],
    separator: ',',
    map: (f) => [f.name, f.description || f.title, joinKeywords(f.tags), ''],
  },
  Magnific: {
    headers: ['File name', 'Title', 'Keywords'],
    separator: ';',
    map: (f) => [f.name, f.title, joinKeywords(f.tags)],
  },
  Vecteezy: {
    headers: ['Filename', 'Title', 'Description', 'Keywords', 'License'],
    separator: ',',
    map: (f) => [f.name, f.title, f.description, joinKeywords(f.tags), ''],
  },
  '123rf': {
    headers: ['oldfilename', '123rf_filename', 'description', 'keywords', 'country'],
    separator: ',',
    quoteAll: true,
    map: (f) => [f.name, '', f.description, joinKeywords(f.tags), ''],
  },
  Pond5: {
    headers: ['OriginalFilename', 'name', 'description', 'keywords'],
    separator: ',',
    map: (f) => [f.name, f.title, f.description, joinKeywords(f.tags)],
  },
  Dreamstime: {
    headers: ['Filename', 'Title', 'Description', 'Keywords'],
    separator: ',',
    map: (f) => [f.name, f.title, f.description, joinKeywords(f.tags)],
  },
}

const DEFAULT_PLATFORM = 'Adobe Stock'

const escapeCsvField = (value, separator, quoteAll) => {
  const str = String(value ?? '')
  if (quoteAll || /[",\n\r]/.test(str) || str.includes(separator)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function generateCSV(files, platform = DEFAULT_PLATFORM) {
  const config = PLATFORM_EXPORTS[platform] || PLATFORM_EXPORTS[DEFAULT_PLATFORM]
  const { headers, separator, map, quoteAll } = config

  const rows = files.map((file) => map(file).map((value) => escapeCsvField(value, separator, quoteAll)))
  const lines = [headers.map((h) => escapeCsvField(h, separator, quoteAll)), ...rows]
  return lines.map((row) => row.join(separator)).join('\n')
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