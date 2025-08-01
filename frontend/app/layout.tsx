import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import Navbar from "../components/navbar"
import Footer from "../components/footer"

// Using a clean, modern sans-serif font with optimized loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  preload: true,
})

export const metadata: Metadata = {
  title: 'PathPilot - AI Career Counselor',
  description: 'Get personalized career guidance and job search assistance with our AI-powered career counselor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full scroll-smooth">
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased flex flex-col min-h-screen selection:bg-primary/20 selection:text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <div className="flex flex-col min-h-screen w-full">
            <Navbar />
            <main className="flex-grow pt-16 w-full">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
