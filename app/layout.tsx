import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'Cuts & Style ERP',
  description: 'Sistema ERP para estéticas y barberías',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="h-full flex">
        <Sidebar />
        <main className="flex-1 ml-60 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
