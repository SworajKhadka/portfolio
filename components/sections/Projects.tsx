'use client'

import { useState } from 'react'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'

type Filter = 'All' | Project['category']

const filters: Filter[] = ['All', 'Full Stack', 'AI / ML', 'Data Science']

export default function Projects() {
  const [active, setActive] = useState<Filter>('All')

  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-[#CCD0CF] md:text-4xl">Projects</h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#4FC9DA]" />
        <p className="mt-4 text-[#9BA8AB]">Things I&apos;ve built</p>
      </div>

      {/* Filter buttons */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              active === f
                ? 'bg-[#4FC9DA] text-[#06141B]'
                : 'border border-[#4A5C6A] text-[#9BA8AB] hover:border-[#4FC9DA] hover:text-[#4FC9DA]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}
