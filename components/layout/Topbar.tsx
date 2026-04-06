'use client'
import { Bell, Search } from 'lucide-react'

interface TopbarProps {
  title: string
  subtitle?: string
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const now = new Date()
  const dateStr = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(now)

  return (
    <header
      className="hidden md:flex h-14 items-center px-6 gap-4 sticky top-0 z-10 border-b"
      style={{ background: 'var(--card)', borderColor: 'var(--card-border)' }}
    >
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-bold leading-tight" style={{ color: 'var(--text)' }}>{title}</h1>
        {subtitle && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>

      <div
        className="hidden md:flex items-center gap-2 rounded-xl px-3 py-2 w-52 border"
        style={{ background: 'var(--input-bg)', borderColor: 'var(--card-border)' }}
      >
        <Search size={13} style={{ color: 'var(--text-faint)' }} />
        <input
          className="bg-transparent text-sm outline-none w-full"
          style={{ color: 'var(--text)', caretColor: 'var(--accent)' }}
          placeholder="Buscar..."
        />
      </div>

      <span className="hidden lg:block text-sm capitalize" style={{ color: 'var(--text-muted)' }}>{dateStr}</span>

      <button
        className="relative w-9 h-9 flex items-center justify-center rounded-xl border transition-colors"
        style={{ background: 'var(--input-bg)', borderColor: 'var(--card-border)' }}
      >
        <Bell size={16} style={{ color: 'var(--text-muted)' }} />
        <span
          className="absolute -top-1 -right-1 w-4 h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
          style={{ background: 'var(--accent)' }}
        >5</span>
      </button>
    </header>
  )
}
