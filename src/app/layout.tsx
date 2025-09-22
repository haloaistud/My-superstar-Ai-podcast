import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '🎙️ Podcast Dashboard',
  description: 'Stream, summarize, and explore episodes with Claude AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Podcast App</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
