import type { Metadata } from 'next'
import { Inter, Rajdhani } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SponsorBar from '@/components/layout/SponsorBar'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'LAS Esports',
  description: 'Hub comunitario de la liga LAS Esports — League of Legends',
}

export const runtime = 'edge'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${rajdhani.variable} antialiased font-sans`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <SponsorBar />
        <Footer />
      </body>
    </html>
  )
}
