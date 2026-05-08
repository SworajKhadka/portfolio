import { GitBranch, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'

const categoryColors: Record<Project['category'], string> = {
  'Full Stack': 'bg-[#4FC9DA11] text-[#4FC9DA] border-[#4FC9DA33]',
  'AI / ML': 'bg-[#9BA8AB11] text-[#9BA8AB] border-[#9BA8AB33]',
  'Data Science': 'bg-[#253745] text-[#9BA8AB] border-[#4A5C6A]',
}

export default function ProjectCard({ title, description, tags, category, github, live }: Project) {
  return (
    <div className="flex flex-col rounded-xl border border-[#4A5C6A] bg-[#11212D] p-6 transition-all duration-300 hover:border-[#4FC9DA44] hover:shadow-[0_0_20px_#4FC9DA0D]">
      {/* Category badge */}
      <span
        className={`inline-block self-start rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColors[category]}`}
      >
        {category}
      </span>

      {/* Title */}
      <h3 className="mt-4 text-lg font-semibold text-[#CCD0CF]">{title}</h3>

      {/* Description */}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9BA8AB]">{description}</p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-[#253745] px-2.5 py-1 text-xs text-[#9BA8AB]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-5 flex items-center gap-3 border-t border-[#253745] pt-4">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="flex items-center gap-1.5 text-xs text-[#9BA8AB] transition-colors duration-300 hover:text-[#4FC9DA]"
          >
            <GitBranch size={15} />
            <span>Source</span>
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View live demo"
            className="flex items-center gap-1.5 text-xs text-[#9BA8AB] transition-colors duration-300 hover:text-[#4FC9DA]"
          >
            <ExternalLink size={15} />
            <span>Live</span>
          </a>
        )}
      </div>
    </div>
  )
}
