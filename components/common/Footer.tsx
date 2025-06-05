"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800 bg-black backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Image
          src="/Images/21-1__2_-removebg-preview.png"
          alt="Invitris Logo"
          width={120}
          height={32}
          className="object-contain"
        />
        <p className="text-xs text-gray-400 self-center mt-5">© 2024 Invitris. All rights reserved.</p>
      </div>
      <nav className="sm:ml-auto flex items-center gap-4 sm:gap-6">
        <Link className="text-xs text-gray-400 hover:text-gray-100 hover:underline underline-offset-4 self-center mt-5" href="/impressum">
          Impressum
        </Link>
      </nav>
      <div className="flex items-center gap-4 sm:ml-8 self-center mt-5">
        <Link href="https://www.linkedin.com/company/invitris/posts/?feedView=all" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-gray-100">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect width="4" height="12" x="2" y="9"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </Link>
      </div>
    </footer>
  )
} 