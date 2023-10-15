import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ChatsSidebar from '@/components/ChatsSidebar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ukuhumusha',
  description: 'Unhinged ChatGPT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-row`}>
        <ChatsSidebar />
        {children}</body>
    </html>
  )
}
