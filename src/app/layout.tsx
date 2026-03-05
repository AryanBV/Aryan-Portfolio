import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import MainLayout from '@/components/layout/MainLayout'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Aryan B V — Full-Stack Developer & AI/ML Engineer',
  description: 'I build production systems — from e-commerce platforms to AI-powered tools.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
