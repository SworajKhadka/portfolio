import Image from 'next/image'

const highlights = [
  {
    title: 'Clean Code',
    body: 'Readable, maintainable code with clear structure and sensible abstractions.',
  },
  {
    title: 'Data-Driven',
    body: 'Decisions backed by data — from user behaviour analytics to ML-powered insights.',
  },
  {
    title: 'Always Learning',
    body: 'Continuously exploring new tools, frameworks, and research to stay sharp.',
  },
]

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        {/* Left — bio */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#CCD0CF] md:text-4xl">About Me</h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-[#4FC9DA]" />
          </div>

          <div className="space-y-4 text-[#9BA8AB] leading-relaxed">
            <p>
              I&apos;m a Full Stack Developer and Data Science enthusiast based in Nepal,
              passionate about crafting products that sit at the intersection of clean
              engineering and intelligent data. I enjoy building end-to-end systems — from
              database schema to polished UI.
            </p>
            <p>
              On the data side, I work with Python, Pandas, and Scikit-learn to explore
              datasets, build predictive models, and surface insights that drive real
              decisions. I believe that great software doesn&apos;t just work — it tells a story.
            </p>
            <p>
              When I&apos;m not coding I&apos;m reading about machine learning research, contributing
              to side projects, or finding new ways to make complex ideas feel simple.
            </p>
          </div>
        </div>

        {/* Right — photo */}
        <div className="flex items-center justify-center md:justify-end">
          <Image
            src="/photo.jpg"
            alt="Sworaj Khadka"
            width={400}
            height={400}
            className="rounded-2xl object-cover w-full aspect-square border border-[#4A5C6A]"
          />
        </div>
      </div>

      {/* Highlight cards */}
      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {highlights.map(({ title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-[#4A5C6A] bg-[#11212D] p-6 transition-colors duration-300 hover:border-[#4FC9DA33]"
          >
            <div className="mb-1 h-1 w-8 rounded-full bg-[#4FC9DA]" />
            <h3 className="mt-3 font-semibold text-[#CCD0CF]">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#9BA8AB]">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
