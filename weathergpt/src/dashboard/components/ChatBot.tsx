import { useState, useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './ChatBot.module.css'

interface Msg {
  id: string
  from: 'assistant' | 'user'
  text: string
  time?: string
  meta?: string
}

export default function ChatBot() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: '1',
      from: 'assistant',
      text: `${t.chat.analyzing}\nCurrent models indicate a 60% chance of heavy precipitation starting late Saturday evening, localized primarily in coastal areas. ${t.chat.riskLevel}`,
      time: '10:42 AM',
      meta: '85 mm',
    },
  ])
  const inputRef = useRef<HTMLInputElement>(null)

  function send() {
    if (!input.trim()) return
    const userMsg: Msg = { id: String(Date.now()), from: 'user', text: input.trim() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    // Simulate backend -> verified data -> AI interpretation -> translated response
    // Do NOT invent official weather; show a safe fallback that explains data is via backend.
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: String(Date.now() + 1),
          from: 'assistant',
          text: `WeatherGPT has forwarded your question to the backend. Verified IMD data will be used to generate a translated response in ${t.common.language}. (Demo: no live AI call in this build)`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    }, 600)
  }

  if (!open) {
    return (
      <button type="button" className={styles.fab} onClick={() => setOpen(true)} aria-label={t.chat.title} style={{ background: 'white', border: '1px solid var(--line-light)' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path d="M12 14a3.2 3.2 0 0 0 3.2-3.2V7A3.2 3.2 0 0 0 12 3.8 3.2 3.2 0 0 0 8.8 7v3.8A3.2 3.2 0 0 0 12 14z" fill="#4285F4" />
            <path d="M11 18.5V21h2v-2.5h-2z" fill="#4285F4" />
            <path d="M17.5 10.2a5.5 5.5 0 0 1-11 0H5a7 7 0 0 0 7 7 7 7 0 0 0 7-7h-1.5z" fill="#34A853" />
            <path d="M12 17a7 7 0 0 1-6.2-3.7l-1.3.6A8.5 8.5 0 0 0 12 18.5V17z" fill="#FBBC05" />
            <path d="M18.2 13.3A7 7 0 0 1 12 17v1.5a8.5 8.5 0 0 0 7.5-4.6l-1.3-.6z" fill="#EA4335" />
          </g>
        </svg>
      </button>
    )
  }

  return (
    <div className={styles.widget} role="dialog" aria-label={t.chat.title}>
      <div className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}>☁️</div>
          <div>
            <div className={styles.title}>{t.chat.title}</div>
            <div className={styles.subtitle}>{t.chat.subtitle}</div>
          </div>
        </div>
        <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label={t.chat.close}>
          ✕
        </button>
      </div>

      <div className={styles.body}>
        {messages.map((m) => (
          <div key={m.id} className={styles.row} data-from={m.from}>
            {m.from === 'assistant' && <div className={styles.avatar}>☁️</div>}
            <div className={styles.bubble} data-from={m.from}>
              <div style={{ whiteSpace: 'pre-wrap', fontSize: 13, lineHeight: 1.6, color: 'var(--ink)' }}>{m.text}</div>
              {m.meta && (
                <div className={styles.metaCard}>
                  <span aria-hidden="true">🌧️</span> <strong className="mono">{m.meta}</strong> <span style={{ color: 'var(--slate)', fontSize: 12 }}>{t.chat.expectedVol}</span>
                </div>
              )}
              {m.time && (
                <div className={styles.timeRow}>
                  <span style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: 11 }}>▶ {t.common.listen}</span>
                  <span className="mono" style={{ color: 'var(--slate-light)', fontSize: 11 }}>{m.time}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {listening && <div className={styles.listening}>{t.chat.listening}</div>}
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.mic}
          aria-label={t.chat.listening}
          onClick={() => {
            setListening((v) => !v)
            setTimeout(() => setListening(false), 2000)
          }}
          data-active={listening}
          style={{ background: listening ? 'var(--red)' : 'white', border: '1px solid var(--line-light)' }}
        >
          {listening ? (
            <span style={{ color: 'white', fontSize: 16 }}>✕</span>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3z" fill="#4285F4" />
              <path d="M17 11a5 5 0 0 1-10 0" stroke="#EA4335" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M12 17v2.5" stroke="#34A853" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="12" cy="8.5" r="1.2" fill="#FBBC05" />
            </svg>
          )}
        </button>
        <div className={styles.inputWrap}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder={t.chat.placeholder}
            aria-label={t.chat.placeholder}
            className={styles.input}
          />
          <button type="button" className={styles.send} onClick={send} aria-label={t.chat.send}>
            ▷
          </button>
        </div>
      </div>
      <div className={styles.powered}>{t.chat.poweredBy}</div>
    </div>
  )
}
