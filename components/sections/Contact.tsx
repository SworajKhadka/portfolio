'use client'

import { useState, type FormEvent } from 'react'
import { SiGithub, SiGmail } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/SworajKhadka',
    icon: <SiGithub size={24} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sworajkhadka21/',
    icon: <FaLinkedin size={24} />,
  },
  {
    label: 'Email',
    href: 'mailto:sworajkhadka21@gmail.com',
    icon: <SiGmail size={24} />,
  },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-2xl px-6 py-24">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-[#CCD0CF] md:text-4xl">Get In Touch</h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#4FC9DA]" />
        <p className="mt-4 text-[#9BA8AB]">
          Have a project in mind or just want to say hi? My inbox is always open.
        </p>
      </div>

      {/* Success message */}
      {status === 'success' && (
        <div className="mb-6 rounded-lg border border-[#4FC9DA33] bg-[#4FC9DA11] px-5 py-4 text-center text-sm font-medium text-[#4FC9DA]">
          Message sent! I&apos;ll get back to you soon.
        </div>
      )}

      {/* Error message */}
      {status === 'error' && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-4 text-center text-sm font-medium text-red-400">
          Something went wrong. Please try again or email me directly.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-[#9BA8AB]">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full rounded-lg border border-[#4A5C6A] bg-[#11212D] px-4 py-3 text-sm text-[#CCD0CF] placeholder-[#4A5C6A] outline-none transition-colors duration-300 focus:border-[#4FC9DA]"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-[#9BA8AB]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full rounded-lg border border-[#4A5C6A] bg-[#11212D] px-4 py-3 text-sm text-[#CCD0CF] placeholder-[#4A5C6A] outline-none transition-colors duration-300 focus:border-[#4FC9DA]"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm text-[#9BA8AB]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
            placeholder="What's on your mind?"
            className="w-full resize-none rounded-lg border border-[#4A5C6A] bg-[#11212D] px-4 py-3 text-sm text-[#CCD0CF] placeholder-[#4A5C6A] outline-none transition-colors duration-300 focus:border-[#4FC9DA]"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg bg-[#4FC9DA] py-3 text-sm font-semibold text-[#06141B] transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : 'Send Message'}
        </button>
      </form>

      {/* Social links */}
      <div className="mt-12 flex items-center justify-center gap-6">
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
    </section>
  )
}
