import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: '🌟 Superstar Podcast Hub',
  description: 'Your Serverless Link to the World. Stream, Connect, Grow.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
        <div id="notifications" className="notifications"></div>
      </body>
    </html>
  )
}
