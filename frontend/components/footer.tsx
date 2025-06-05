import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-800 bg-gray-950/80 backdrop-blur-sm">
      {/* Neon Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>

      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                CareerBot
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">A personal project by [Your Name]</p>
          </div>

          <div className="flex space-x-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} Career Counsellor Chatbot. Personal Project.
          </p>
        </div>
      </div>
    </footer>
  )
}
