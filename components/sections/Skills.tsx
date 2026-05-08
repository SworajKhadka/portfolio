'use client'

import { useState } from 'react'
import {
  SiPython, SiJavascript, SiTypescript, SiMysql, SiHtml5, SiCss,
  SiC, SiGnubash,
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiFigma,
  SiNodedotjs, SiFlask, SiFastapi, SiPostman,
  SiPostgresql, SiMongodb,
  SiPandas, SiNumpy, SiScikitlearn, SiJupyter, SiGooglesheets,
  SiApachespark, SiApachekafka, SiApachehive,
  SiGit, SiGithub, SiLinux, SiIntellijidea, SiVscodium, SiCloudflare, SiVercel,
  SiNotion, SiCanva,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { skillGroups } from '@/data/skills'

const iconMap: Record<string, IconType> = {
  SiPython, SiJavascript, SiTypescript, SiMysql, SiHtml5, SiCss,
  SiC, SiGnubash,
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiFigma,
  SiNodedotjs, SiFlask, SiFastapi, SiPostman,
  SiPostgresql, SiMongodb,
  SiPandas, SiNumpy, SiScikitlearn, SiJupyter, SiGooglesheets,
  SiApachespark, SiApachekafka, SiApachehive,
  SiGit, SiGithub, SiLinux, SiIntellijidea, SiVscodium, SiCloudflare, SiVercel,
  SiNotion, SiCanva,
  FaJava,
}

const TABS: { label: string; category: string | null }[] = [
  { label: 'All',            category: null },
  { label: 'Languages',      category: 'Languages' },
  { label: 'Frontend',       category: 'Frontend' },
  { label: 'Backend & APIs', category: 'Backend & APIs' },
  { label: 'Databases',      category: 'Databases' },
  { label: 'Data Science',   category: 'Data Science & Analytics' },
  { label: 'Big Data',       category: 'Data Engineering & Big Data' },
  { label: 'Tools & DevOps', category: 'Tools & DevOps' },
  { label: 'Productivity',   category: 'Productivity & Design' },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered =
    activeCategory === null
      ? skillGroups.flatMap((g) => g.skills)
      : (skillGroups.find((g) => g.category === activeCategory)?.skills ?? [])

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-[#CCD0CF] md:text-4xl">Tech Stack</h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#4FC9DA]" />
        <p className="mt-4 text-[#9BA8AB]">What I work with</p>
      </div>

      {/* Tab bar */}
      <div className="no-scrollbar flex flex-nowrap gap-2 overflow-x-auto pb-1">
        {TABS.map(({ label, category }) => {
          const active = activeCategory === category
          return (
            <button
              key={label}
              onClick={() => setActiveCategory(category)}
              className={[
                'flex-shrink-0 rounded-full border px-4 py-1.5 text-sm transition-all duration-200',
                active
                  ? 'border-[#4FC9DA] bg-[#4FC9DA] font-semibold text-[#06141B]'
                  : 'border-[#4A5C6A] bg-[#11212D] font-medium text-[#9BA8AB] hover:border-[#4FC9DA] hover:text-[#4FC9DA]',
              ].join(' ')}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Count */}
      <p className="mt-3 text-xs text-[#9BA8AB]">Showing {filtered.length} skills</p>

      {/* Grid */}
      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {filtered.map(({ name, icon }) => {
          const Icon = iconMap[icon]
          return (
            <div
              key={name}
              className="group flex aspect-square cursor-default flex-col items-center justify-center gap-2 rounded-xl border border-[#4A5C6A] bg-[#11212D] transition-all duration-200 hover:scale-105 hover:border-[#4FC9DA] hover:bg-[#253745]"
            >
              {Icon && (
                <Icon
                  size={28}
                  className="text-[#9BA8AB] transition-colors duration-200 group-hover:text-[#4FC9DA]"
                />
              )}
              <span className="px-1 text-center text-xs leading-tight text-[#CCD0CF] transition-colors duration-200 group-hover:text-[#4FC9DA]">
                {name}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
