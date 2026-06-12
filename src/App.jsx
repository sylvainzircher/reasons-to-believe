import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Library from './pages/Library.jsx'
import Article from './pages/Article.jsx'
import Chat from './pages/Chat.jsx'
import { articles } from './lib/articles.js'

// ── Password gate ────────────────────────────────────────────────
const SESSION_KEY = 'rf_auth'
const CORRECT = import.meta.env.VITE_APP_PASSWORD

function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return children

  function handleSubmit(e) {
    e.preventDefault()
    if (input === CORRECT) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setInput('')
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: '#f3f4f6', border: '1px solid #e5e7eb',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: 22,
          }}>
            📚
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0d0d0d', marginBottom: 6 }}>
            Reasons &amp; Faith
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280' }}>Enter your password to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1.5px solid ${error ? '#fca5a5' : '#e5e7eb'}`,
              borderRadius: 10,
              fontSize: 15,
              color: '#0d0d0d',
              outline: 'none',
              background: error ? '#fef2f2' : '#f9fafb',
              transition: 'border-color 0.15s, background 0.15s',
            }}
            onFocus={e => { if (!error) e.target.style.borderColor = '#10a37f' }}
            onBlur={e => { if (!error) e.target.style.borderColor = '#e5e7eb' }}
          />
          {error && (
            <p style={{ fontSize: 13, color: '#ef4444', textAlign: 'center', margin: '-4px 0' }}>
              Incorrect password
            </p>
          )}
          <button
            type="submit"
            style={{
              padding: '12px',
              background: '#10a37f',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.target.style.background = '#059669'}
            onMouseLeave={e => e.target.style.background = '#10a37f'}
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Mobile top bar ──────────────────────────────────────────────
function MobileTopBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const onArticle = location.pathname.startsWith('/article/')

  if (onArticle) {
    return (
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#fff', borderBottom: '1px solid #e5e7eb',
        padding: '13px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#6b7280', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, padding: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Library
        </button>
      </div>
    )
  }

  return (
    <div className="top-seg-nav" style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#fff', borderBottom: '1px solid #e5e7eb',
      padding: '10px 16px',
    }}>
      <div style={{
        display: 'flex',
        background: '#f3f4f6',
        borderRadius: 10,
        padding: 3,
        width: '100%',
        gap: 3,
      }}>
        {[
          { to: '/', label: 'Library', end: true },
          { to: '/chat', label: 'Ask AI', end: false },
        ].map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={({ isActive }) => ({
              flex: 1,
              textAlign: 'center',
              padding: '8px 0',
              borderRadius: 7,
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#0d0d0d' : '#6b7280',
              background: isActive ? '#ffffff' : 'transparent',
              boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              textDecoration: 'none',
              transition: 'all 0.15s',
            })}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

// ── Desktop sidebar ─────────────────────────────────────────────
function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-logo">Reasons &amp; Faith</div>

      <div className="sidebar-section-label">Navigation</div>
      <NavLink to="/" end className={({ isActive }) => 'sidebar-nav-link' + (isActive ? ' active' : '')}>
        <svg className="sidebar-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        </svg>
        Library
      </NavLink>
      <NavLink to="/chat" className={({ isActive }) => 'sidebar-nav-link' + (isActive ? ' active' : '')}>
        <svg className="sidebar-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M5.5 8h5M8 5.5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        Ask AI
      </NavLink>

      <div className="sidebar-section-label" style={{ marginTop: 12 }}>Library</div>
      <div style={{ padding: '4px 12px 8px', fontSize: 13, color: '#9ca3af', lineHeight: 1.5 }}>
        {articles.length} articles
      </div>

      <div style={{ marginTop: 'auto', padding: '16px 12px 4px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: 12, color: '#9ca3af' }}>Personal knowledge library</div>
      </div>
    </aside>
  )
}

// ── App shell ───────────────────────────────────────────────────
function AppInner() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <MobileTopBar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <PasswordGate>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </PasswordGate>
  )
}
