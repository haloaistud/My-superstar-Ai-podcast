import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-headline' });

export const metadata: Metadata = {
  title: 'MySuperstarAIpodcast | Live Streaming Made Easy',
  description: 'Your Stage. Your Story. Your Superstar Podcast — Stream Live, Share Everywhere, Shine Forever.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
