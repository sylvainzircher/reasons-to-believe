import { useParams, useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import { articles } from '../lib/articles.js'

marked.setOptions({ gfm: true, breaks: false })

const COLLECTION_META = {
  'Religion':    { color: '#7c3aed', bg: '#f5f3ff' },
  'ICR Science': { color: '#059669', bg: '#ecfdf5' },
  'Essentia':    { color: '#2563eb', bg: '#eff6ff' },
  'Apologetics': { color: '#d97706', bg: '#fffbeb' },
}
const DEFAULT_META = { color: '#6b7280', bg: '#f9fafb' }

export default function Article() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return (
      <div style={{ padding: 32, textAlign: 'center', paddingTop: 80 }}>
        <p style={{ color: '#6b7280', marginBottom: 16 }}>Article not found.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '8px 20px', background: '#10a37f', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer',
          }}
        >
          ← Back to Library
        </button>
      </div>
    )
  }

  const html = marked(article.content || '')
  const meta = COLLECTION_META[article.collection] || DEFAULT_META

  return (
    <div style={{ background: '#fff', minHeight: '100%' }}>
      <div className="article-body-wrapper" style={{ padding: '28px 24px 72px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#9ca3af', fontSize: 13,
              display: 'flex', alignItems: 'center', gap: 4, padding: 0,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#374151'}
            onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Library
          </button>
          <span style={{ color: '#e5e7eb' }}>/</span>
          <span style={{
            fontSize: 12, fontWeight: 500, color: meta.color,
            background: meta.bg, padding: '2px 10px', borderRadius: 20,
          }}>
            {article.collection}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 28, fontWeight: 700, lineHeight: 1.25,
          color: '#0d0d0d', marginBottom: 14, letterSpacing: '-0.3px',
        }}>
          {article.title}
        </h1>

        {/* Source + Date inline row */}
        {(article.source || article.date) && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            gap: 8, marginBottom: 14,
          }}>
            {article.source && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 13, color: '#374151', fontWeight: 500,
              }}>
                {/* Book icon */}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ color: '#9ca3af', flexShrink: 0 }}>
                  <path d="M2 2h10v10H2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                  <path d="M4 5h6M4 7.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                {article.source}
              </span>
            )}
            {article.source && article.date && (
              <span style={{ color: '#d1d5db' }}>·</span>
            )}
            {article.date && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 13, color: '#6b7280',
              }}>
                {/* Calendar icon */}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ color: '#9ca3af', flexShrink: 0 }}>
                  <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M1.5 5.5h11" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M4.5 1v3M9.5 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                {article.date}
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        {article.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
            {article.tags.map(tag => (
              <span key={tag} style={{
                padding: '3px 11px', borderRadius: 20,
                fontSize: 12, fontWeight: 500,
                background: meta.bg, color: meta.color,
                border: `1px solid ${meta.color}30`,
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: 28 }} />

        {/* Body */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      </div>
    </div>
  )
}
