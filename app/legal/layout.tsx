import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import UkuhumushaHeader from '@/components/UkuhumushaHeader'

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
      <body className={inter.className}>
        <div className="w-full h-full bg-p-5">
          <div className='flex relative items-center justify-center flex-col gap-2 w-full h-screen rounded-t-3xl bg-white text-center'>
            <UkuhumushaHeader />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
