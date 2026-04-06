import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Shell from '@/components/layout/Shell'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'Cuts & Style ERP',
  description: 'Sistema ERP para estéticas y barberías',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="h-full overflow-x-hidden">
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
