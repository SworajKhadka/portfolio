import { SiGithub, SiGmail } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/SworajKhadka', icon: <SiGithub size={18} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sworajkhadka21/', icon: <FaLinkedin size={18} /> },
  { label: 'Email', href: 'mailto:sworajkhadka21@gmail.com', icon: <SiGmail size={18} /> },
]

export default function Footer() {
  return (
    <footer className="bg-[#11212D] py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-[#9BA8AB]">
          © 2025 Sworaj Khadka — Built with Next.js &amp; Tailwind CSS
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="text-[#9BA8AB] transition-colors duration-300 hover:text-[#4FC9DA]"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
