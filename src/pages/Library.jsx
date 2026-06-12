import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { articles, collections } from '../lib/articles.js'
import { getPalette } from '../lib/palette.js'

// Simple colored dot / initial badge per collection
const COLLECTION_COLORS = {
  'Religion':    '#a855f7',
  'ICR Science': '#10a37f',
  'Essentia':    '#3b82f6',
  'Apologetics': '#f59e0b',
}

function collectionColor(c) {
  return COLLECTION_COLORS[c] || '#6b7280'
}

// Small tag pill
function Tag({ label }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 500,
      background: '#f3f4f6',
      color: '#374151',
      letterSpacing: '0.01em',
    }}>
      {label}
    </span>
  )
}

export default function Library() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeCollection, setActiveCollection] = useState('All')
  const [hoveredSlug, setHoveredSlug] = useState(null)

  const filtered = articles.filter(a => {
    const matchesCol = activeCollection === 'All' || a.collection === activeCollection
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.source.toLowerCase().includes(q) ||
      a.collection.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    return matchesCol && matchesSearch
  })

  return (
    <div style={{ minHeight: '100%', background: '#fff', overflowX: 'hidden', width: '100%' }}>
      <div className="library-inner" style={{ padding: '24px 16px 32px', overflowX: 'hidden', width: '100%' }}>

        {/* Page title */}
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0d0d0d', marginBottom: 18 }}>
          Library
        </h1>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <svg style={{
            position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
            color: '#9ca3af', pointerEvents: 'none',
          }} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.6"/>
            <line x1="10.5" y1="10.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 14px 11px 38px',
              border: '1px solid #e5e7eb',
              borderRadius: 10,
              background: '#f9fafb',
              fontSize: 14,
              color: '#0d0d0d',
              outline: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onFocus={e => { e.target.style.borderColor = '#10a37f'; e.target.style.boxShadow = '0 0 0 3px rgba(16,163,127,0.12)' }}
            onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none' }}
          />
        </div>

        {/* Collection pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {collections.map(col => {
            const active = activeCollection === col
            return (
              <button
                key={col}
                onClick={() => setActiveCollection(col)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 20,
                  border: active ? '1px solid #10a37f' : '1px solid #e5e7eb',
                  background: active ? '#10a37f' : '#fff',
                  color: active ? '#fff' : '#374151',
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {col}
              </button>
            )
          })}
        </div>

        {/* Results count */}
        <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 14 }}>
          {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: '0 auto 12px', display: 'block' }}>
              <circle cx="20" cy="20" r="18" stroke="#d1d5db" strokeWidth="1.5"/>
              <path d="M14 20h12M20 14v12" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p style={{ fontSize: 14 }}>No articles found.</p>
          </div>
        ) : (
          <div
            className="card-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
              gap: 12,
            }}
          >
            {filtered.map(article => {
              const isHovered = hoveredSlug === article.slug
              const dot = collectionColor(article.collection)

              return (
                <div
                  key={article.slug}
                  onClick={() => navigate(`/article/${article.slug}`)}
                  onMouseEnter={() => setHoveredSlug(article.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: '16px 14px',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.15s, border-color 0.15s',
                    boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
                    borderColor: isHovered ? '#d1d5db' : '#e5e7eb',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {/* Collection label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: dot, flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {article.collection}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: '#111827',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {article.title}
                  </h2>

                  {/* Source */}
                  {article.source && (
                    <p style={{
                      fontSize: 12,
                      color: '#9ca3af',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {article.source}
                    </p>
                  )}

                  {/* Tags */}
                  {article.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
                      {article.tags.slice(0, 2).map(t => <Tag key={t} label={t} />)}
                      {article.tags.length > 2 && (
                        <span style={{ fontSize: 11, color: '#9ca3af', padding: '2px 4px' }}>
                          +{article.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
