export type Project = {
  title: string
  description: string
  tags: string[]
  category: 'Full Stack' | 'AI / ML' | 'Data Science'
  github?: string
  live?: string
}

export const projects: Project[] = [
  {
    title: 'Scash',
    description: 'A web platform where users can publish their side hustles and monetize their skills in exchange for payment.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    category: 'Full Stack',
    github: '#',
    live: '#',
  },
  {
    title: 'Resume Skill Analyzer',
    description: 'Analyzes your resume and identifies missing skills compared to a target job description using NLP.',
    tags: ['Python', 'NLP', 'React', 'FastAPI'],
    category: 'AI / ML',
    github: '#',
    live: '#',
  },
  {
    title: 'GitHub Profile Analyzer',
    description: 'View detailed GitHub profile statistics — repos, stars, languages, and contribution graphs from just a username.',
    tags: ['React', 'GitHub API', 'TypeScript'],
    category: 'Full Stack',
    github: '#',
    live: '#',
  },
  {
    title: 'Movie Recommender',
    description: 'Content-based movie recommendation system using cosine similarity on TF-IDF vectors of movie metadata.',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit'],
    category: 'Data Science',
    github: '#',
    live: '#',
  },
  {
    title: 'Customer Segmentation & Retention Analysis',
    description: 'K-Means clustering on customer transaction data to identify segments and predict churn risk.',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
    category: 'Data Science',
    github: '#',
    live: '#',
  },
]
