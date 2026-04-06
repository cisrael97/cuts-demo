'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'

export default function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Backdrop mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar: hidden on mobile unless open, always visible on md+ */}
      <div className={[
        'fixed inset-y-0 left-0 z-50 md:block',
        open ? 'block' : 'hidden',
      ].join(' ')}>
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {/* Main content */}
      <div className="md:ml-60 flex flex-col min-h-screen">
        {/* Mobile header bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30">
          <button
            onClick={() => setOpen(true)}
            className="w-9 h-9 bg-[#16213e] text-white rounded-xl flex flex-col items-center justify-center gap-1.5 flex-shrink-0"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-rose-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-bold">C</span>
            </div>
            <span className="font-bold text-gray-900 text-sm">Cuts & Style</span>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
