export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center"
    >
      {/* Label */}
      <span className="mb-6 inline-block rounded-full border border-[#4FC9DA33] bg-[#4FC9DA11] px-4 py-1.5 text-sm font-medium tracking-wide text-[#4FC9DA]">
        Full Stack Developer &amp; DS Enthusiast
      </span>

      {/* Headline */}
      <h1 className="font-bold leading-none tracking-tight text-6xl md:text-8xl">
        <span className="block text-[#CCD0CF]">Sworaj</span>
        <span className="block text-[#4FC9DA]">Khadka</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-xl text-base leading-relaxed text-[#9BA8AB] md:text-lg">
        I build scalable web applications and turn raw data into meaningful insights.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="rounded-lg bg-[#4FC9DA] px-6 py-3 text-sm font-semibold text-[#06141B] transition-all duration-300 hover:brightness-110"
        >
          View My Work
        </a>
        <a
          href="/resume.pdf"
          download
          className="rounded-lg border border-[#4FC9DA] px-6 py-3 text-sm font-semibold text-[#4FC9DA] transition-all duration-300 hover:bg-[#4FC9DA] hover:text-[#06141B]"
        >
          Download CV
        </a>
      </div>

      {/* Stat pills */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        {[
          { value: '5+', label: 'Projects' },
          { value: '2+', label: 'Years Exp' },
          { value: '30+', label: 'Technologies' },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="rounded-full border border-[#4A5C6A] px-5 py-2 text-sm text-[#9BA8AB]"
          >
            <span className="font-semibold text-[#CCD0CF]">{value}</span>{' '}
            {label}
          </div>
        ))}
      </div>
    </section>
  )
}
