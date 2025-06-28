import Link from "next/link"
import { Github, ExternalLink, Compass } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8 mt-10 w-full">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center w-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center justify-center w-6 h-6">
              <Compass className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium tracking-wide text-primary">PathPilot</span>
          </div>

          {/* Links */}
          <div className="flex space-x-10 mb-8">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Chat
            </Link>
          </div>

          {/* Attribution */}
          <div className="text-xs text-muted-foreground/70 flex items-center flex-wrap justify-center gap-2 mb-4 w-full">
            <span>© {new Date().getFullYear()} PathPilot AI</span>
            <span className="block w-1 h-1 rounded-full bg-border"></span>
            <span>Built with Next.js and Tailwind</span>
            <span className="block w-1 h-1 rounded-full bg-border"></span>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-primary transition-colors">
              GitHub <ExternalLink className="ml-1 w-3 h-3" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
