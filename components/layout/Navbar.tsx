'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#11212D] backdrop-blur-md transition-all duration-300 ${scrolled ? 'border-b border-[#4A5C6A]' : 'border-b border-transparent'
        }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="text-xl font-bold tracking-tight">
          <span className="text-[#4FC9DA]">SWORAJ</span>
          <span className="text-[#CCD0CF]">Khadka</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="group relative text-sm text-[#9BA8AB] transition-colors duration-300 hover:text-[#CCD0CF]"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#4FC9DA] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <a
            href="/resume.pdf"
            download
            className="rounded border border-[#4FC9DA] px-4 py-1.5 text-sm text-[#4FC9DA] transition-all duration-300 hover:bg-[#4FC9DA] hover:text-[#06141B]"
          >
            Download CV
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-[#9BA8AB] transition-colors duration-300 hover:text-[#CCD0CF] md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="flex flex-col gap-1 bg-[#11212D] px-6 pb-6 pt-2">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              className="py-2.5 text-sm text-[#9BA8AB] transition-colors duration-300 hover:text-[#CCD0CF]"
            >
              {label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            onClick={closeMenu}
            className="mt-3 rounded border border-[#4FC9DA] px-4 py-2 text-center text-sm text-[#4FC9DA] transition-all duration-300 hover:bg-[#4FC9DA] hover:text-[#06141B]"
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  )
}
