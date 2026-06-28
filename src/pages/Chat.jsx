import { useState, useRef, useEffect } from 'react'
import Anthropic from '@anthropic-ai/sdk'
import { marked } from 'marked'
import { useNavigate } from 'react-router-dom'
import { articles } from '../lib/articles.js'

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

function buildContext() {
  return articles.map(a =>
    `--- ARTICLE: "${a.title}" | URL: /article/${a.slug} | Source: ${a.source || 'Unknown'} | Tags: ${a.tags.join(', ')} ---\n${a.content}`
  ).join('\n\n')
}

const SYSTEM = `You are a knowledgeable research assistant for the "Reasons & Faith" knowledge library.

You have access to the following articles:

${buildContext()}

Rules:
- Answer ONLY from the articles above. Do not use outside knowledge.
- When referencing an article, always link to it using its URL in markdown format, e.g. [Article Title](/article/slug).
- If the answer is not in the articles, say: "I don't have information about that in the current library."
- Be concise and clear. Format with markdown when helpful.`

// Suggested prompts shown in empty state
const SUGGESTIONS = [
  'What archaeological evidence supports the Bible?',
  'What is the transmissive theory of consciousness?',
  'How does DNA confirm intelligent design?',
  'What are the main arguments for the resurrection?',
]

function ThinkingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '4px 0' }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#9ca3af',
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function ChatMessage({ content }) {
  const navigate = useNavigate()
  const html = marked(content || '')

  function handleClick(e) {
    const anchor = e.target.closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href')
    if (href && href.startsWith('/')) {
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    <div
      className="prose chat-prose"
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={handleClick}
    />
  )
}

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSend(text) {
    const trimmed = (text || input).trim()
    if (!trimmed || loading) return

    const userMessage = { role: 'user', content: trimmed }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError(null)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    try {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        system: SYSTEM,
        messages: newMessages,
      })
      const assistantText = response.content[0]?.text || ''
      setMessages(prev => [...prev, { role: 'assistant', content: assistantText }])
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleTextareaChange(e) {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
  }

  const canSend = input.trim().length > 0 && !loading

  return (
    <div className="chat-outer" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>

      {/* Messages area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}>

        {/* Empty state */}
        {messages.length === 0 && !loading && (
          <div style={{ maxWidth: 560, margin: '0 auto', width: '100%', paddingTop: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0d0d0d', marginBottom: 6 }}>
              Ask your library
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 28, lineHeight: 1.6 }}>
              I'll answer only from the {articles.length} articles you've saved. No outside knowledge.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    border: '1px solid #e5e7eb',
                    borderRadius: 10,
                    background: '#f9fafb',
                    fontSize: 13,
                    color: '#374151',
                    cursor: 'pointer',
                    lineHeight: 1.45,
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = '#10a37f'; e.target.style.background = '#f0fdf9' }}
                  onMouseLeave={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              maxWidth: 720,
              margin: '0 auto',
              width: '100%',
              padding: '18px 0',
              borderBottom: i < messages.length - 1 ? '1px solid #f3f4f6' : 'none',
            }}
          >
            {/* Role label */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: msg.role === 'user' ? '#e5e7eb' : '#10a37f',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
                color: msg.role === 'user' ? '#374151' : '#fff',
                flexShrink: 0,
              }}>
                {msg.role === 'user' ? 'Y' : 'AI'}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                {msg.role === 'user' ? 'You' : 'Assistant'}
              </span>
            </div>

            {/* Content */}
            <div style={{ paddingLeft: 36 }}>
              <ChatMessage content={msg.content} />
            </div>
          </div>
        ))}

        {/* Thinking indicator */}
        {loading && (
          <div style={{ maxWidth: 720, margin: '0 auto', width: '100%', padding: '18px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', background: '#10a37f',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#fff',
              }}>
                AI
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Assistant</span>
            </div>
            <div style={{ paddingLeft: 36 }}>
              <ThinkingIndicator />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            maxWidth: 720, margin: '12px auto 0', width: '100%',
            padding: '12px 16px', background: '#fef2f2',
            border: '1px solid #fecaca', borderRadius: 10,
            fontSize: 13, color: '#b91c1c',
          }}>
            ⚠️ {error}
          </div>
        )}

        <div ref={messagesEndRef} style={{ height: 24 }} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px 20px',
        background: '#fff',
        borderTop: '1px solid #f3f4f6',
      }}>
        <div style={{
          maxWidth: 720, margin: '0 auto',
          position: 'relative',
          border: '1px solid #e5e7eb',
          borderRadius: 14,
          background: '#fff',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
          onFocusCapture={e => { e.currentTarget.style.borderColor = '#10a37f'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(16,163,127,0.15)' }}
          onBlurCapture={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Message your library…"
            rows={1}
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 52px 14px 16px',
              border: 'none',
              borderRadius: 14,
              background: 'transparent',
              fontSize: 14,
              color: '#0d0d0d',
              resize: 'none',
              outline: 'none',
              lineHeight: 1.55,
              maxHeight: 160,
              overflow: 'auto',
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!canSend}
            style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              width: 34,
              height: 34,
              borderRadius: 8,
              border: 'none',
              background: canSend ? '#10a37f' : '#e5e7eb',
              color: canSend ? '#fff' : '#9ca3af',
              cursor: canSend ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: 11, color: '#d1d5db', marginTop: 8 }}>
          Answers based only on your saved articles · {articles.length} indexed
        </p>
      </div>

    </div>
  )
}
