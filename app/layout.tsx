import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sworaj Khadka',
  description: 'Full Stack Developer & Data Science Enthusiast',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary antialiased">{children}</body>
    </html>
  )
}
