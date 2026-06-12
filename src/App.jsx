import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Library from './pages/Library.jsx'
import Article from './pages/Article.jsx'
import Chat from './pages/Chat.jsx'
import { articles } from './lib/articles.js'

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
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
