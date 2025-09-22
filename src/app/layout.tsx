import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '🌟 Superstar Podcast Hub',
  description: 'Yardie-Style Streaming • Podcast Channels • Live Community',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <div id="notifications" className="notifications"></div>
      </body>
    </html>
  )
}
