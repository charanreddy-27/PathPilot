import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// Import directly from next-themes instead of our local file
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

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
  description: 'Navigate your professional journey with personalized guidance from our advanced AI career counselor',
  keywords: 'career guidance, AI counselor, job advice, interview tips, resume help, career path',
  icons: {
    icon: '/placeholder-logo.png',
  },
}

// Define ThemeProvider directly in this file to avoid import issues
function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'dark',
  forcedTheme,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      forcedTheme={forcedTheme}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
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
