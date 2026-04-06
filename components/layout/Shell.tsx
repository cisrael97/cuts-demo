'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — always visible md+, drawer on mobile */}
      <div className={`fixed inset-y-0 left-0 z-30 transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {/* Main */}
      <main className="flex-1 md:ml-60 min-h-screen flex flex-col">
        {/* Mobile topbar trigger — passed via context-free approach: rendered in each page's Topbar */}
        <div className="md:hidden fixed top-0 left-0 z-10 p-3">
          <button
            onClick={() => setOpen(true)}
            className="w-9 h-9 bg-[#16213e] text-white rounded-xl flex flex-col items-center justify-center gap-1"
            aria-label="Abrir menú"
          >
            <span className="w-4 h-0.5 bg-white rounded" />
            <span className="w-4 h-0.5 bg-white rounded" />
            <span className="w-4 h-0.5 bg-white rounded" />
          </button>
        </div>
        {children}
      </main>
    </>
  )
}
