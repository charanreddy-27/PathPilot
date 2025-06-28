import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/lib/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Using a clean, modern sans-serif font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'PathPilot - AI Career Counselor',
  description: 'Navigate your professional journey with personalized guidance from our advanced AI career counselor',
  keywords: 'career guidance, AI counselor, job advice, interview tips, resume help, career path',
  icons: {
    icon: '/placeholder-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
