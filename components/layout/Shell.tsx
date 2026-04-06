'use client'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'
import { useThemeStore } from '@/lib/store/useThemeStore'

export default function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const tema = useThemeStore((s) => s.tema)

  // Apply theme class to <html>
  useEffect(() => {
    const html = document.documentElement
    if (tema === 'barberia') {
      html.classList.add('barberia')
    } else {
      html.classList.remove('barberia')
    }
  }, [tema])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Backdrop mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={[
        'fixed inset-y-0 left-0 z-50 md:block',
        open ? 'block' : 'hidden',
      ].join(' ')}>
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {/* Main */}
      <div className="md:ml-60 flex flex-col min-h-screen">
        {/* Mobile header */}
        <div
          className="md:hidden flex items-center gap-3 px-4 py-3 sticky top-0 z-30 border-b"
          style={{ background: 'var(--sidebar-bg)', borderColor: 'var(--card-border)' }}
        >
          <button
            onClick={() => setOpen(true)}
            className="w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1.5 flex-shrink-0"
            style={{ background: 'var(--accent)' }}
          >
            <Menu size={18} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--accent)' }}
            >
              <span className="text-white text-[10px] font-bold">C</span>
            </div>
            <span className="font-bold text-sm" style={{ color: 'var(--accent)' }}>
              Cuts & Style
            </span>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
