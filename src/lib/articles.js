const files = import.meta.glob('/articles/**/*.md', { query: '?raw', import: 'default', eager: true })

const FOLDER_LABELS = {
  'religion': 'Religion',
  'icr-science': 'ICR Science',
  'essentia-foundation': 'Essentia',
  'apologetics': 'Apologetics',
}

function collectionFromPath(path) {
  const folder = path.split('/')[2]
  return FOLDER_LABELS[folder] || folder
}

function slugFromPath(path) {
  return path.replace('/articles/', '').replace(/\.md$/, '').replace(/\//g, '--')
}

function parseTags(raw) {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.map(t => String(t).trim())
  return String(raw).split(',').map(t => t.trim()).filter(Boolean)
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const data = {}
  match[1].split('\n').forEach(line => {
    const colon = line.indexOf(':')
    if (colon > 0) {
      const key = line.slice(0, colon).trim()
      const value = line.slice(colon + 1).trim()
      data[key] = value
    }
  })
  return { data, content: match[2] }
}

export const articles = Object.entries(files).map(([path, raw]) => {
  const { data, content } = parseFrontmatter(raw)
  const filename = path.split('/').pop().replace(/\.md$/, '')
  const titleFromFile = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return {
    slug: slugFromPath(path),
    path,
    collection: collectionFromPath(path),
    title: data.title || titleFromFile,
    source: data.source || '',
    tags: parseTags(data.tags),
    date: data.date || '',
    content,
  }
}).sort((a, b) => a.title.localeCompare(b.title))

export const collections = ['All', ...Array.from(new Set(articles.map(a => a.collection))).sort()]
