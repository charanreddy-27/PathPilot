import Link from "next/link"
import { Github, ExternalLink, BrainCircuit } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8 mt-10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full">
              <BrainCircuit className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-blue-400">PathPilot</span>
          </div>

          {/* Links */}
          <div className="flex space-x-10 mb-8">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/chat" className="text-sm text-gray-400 hover:text-white transition-colors">
              Chat
            </Link>
          </div>

          {/* Attribution */}
          <div className="text-xs text-gray-500 flex items-center flex-wrap justify-center gap-2 mb-4">
            <span>© {new Date().getFullYear()} PathPilot AI</span>
            <span className="block w-1 h-1 rounded-full bg-gray-700"></span>
            <span>Built with Next.js and Tailwind</span>
            <span className="block w-1 h-1 rounded-full bg-gray-700"></span>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-blue-400 transition-colors">
              GitHub <ExternalLink className="ml-1 w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
