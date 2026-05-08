export type SkillGroup = {
  category: string
  skills: { name: string; icon: string; iconLib: 'si' | 'fa' | 'tb' | 'gi' }[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', icon: 'SiPython', iconLib: 'si' },
      { name: 'Java', icon: 'FaJava', iconLib: 'fa' },
      { name: 'JavaScript', icon: 'SiJavascript', iconLib: 'si' },
      { name: 'TypeScript', icon: 'SiTypescript', iconLib: 'si' },
      { name: 'C', icon: 'SiC', iconLib: 'si' },
      { name: 'SQL', icon: 'SiMysql', iconLib: 'si' },
      { name: 'HTML', icon: 'SiHtml5', iconLib: 'si' },
      { name: 'CSS', icon: 'SiCss', iconLib: 'si' },
      { name: 'Bash/Shell', icon: 'SiGnubash', iconLib: 'si' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', icon: 'SiReact', iconLib: 'si' },
      { name: 'Next.js', icon: 'SiNextdotjs', iconLib: 'si' },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss', iconLib: 'si' },
      { name: 'Framer Motion', icon: 'SiFramer', iconLib: 'si' },
      { name: 'Figma', icon: 'SiFigma', iconLib: 'si' },
    ],
  },
  {
    category: 'Backend & APIs',
    skills: [
      { name: 'Node.js', icon: 'SiNodedotjs', iconLib: 'si' },
      { name: 'Flask', icon: 'SiFlask', iconLib: 'si' },
      { name: 'FastAPI', icon: 'SiFastapi', iconLib: 'si' },
      { name: 'REST APIs', icon: 'SiPostman', iconLib: 'si' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: 'SiPostgresql', iconLib: 'si' },
      { name: 'MySQL', icon: 'SiMysql', iconLib: 'si' },
      { name: 'MongoDB', icon: 'SiMongodb', iconLib: 'si' },
    ],
  },
  {
    category: 'Data Science & Analytics',
    skills: [
      { name: 'Pandas', icon: 'SiPandas', iconLib: 'si' },
      { name: 'NumPy', icon: 'SiNumpy', iconLib: 'si' },
      { name: 'Scikit-learn', icon: 'SiScikitlearn', iconLib: 'si' },
      { name: 'Matplotlib', icon: 'SiPython', iconLib: 'si' },
      { name: 'Seaborn', icon: 'SiPython', iconLib: 'si' },
      { name: 'Jupyter', icon: 'SiJupyter', iconLib: 'si' },
      { name: 'Power BI', icon: 'SiPython', iconLib: 'si' },
      { name: 'Excel', icon: 'SiGooglesheets', iconLib: 'si' },
    ],
  },
  {
    category: 'Data Engineering & Big Data',
    skills: [
      { name: 'Apache Spark', icon: 'SiApachespark', iconLib: 'si' },
      { name: 'Apache Kafka', icon: 'SiApachekafka', iconLib: 'si' },
      { name: 'Apache Hive', icon: 'SiApachehive', iconLib: 'si' },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: 'SiGit', iconLib: 'si' },
      { name: 'GitHub', icon: 'SiGithub', iconLib: 'si' },
      { name: 'Postman', icon: 'SiPostman', iconLib: 'si' },
      { name: 'Linux', icon: 'SiLinux', iconLib: 'si' },
      { name: 'IntelliJ IDEA', icon: 'SiIntellijidea', iconLib: 'si' },
      { name: 'VS Code', icon: 'SiVscodium', iconLib: 'si' },
      { name: 'Cloudflare', icon: 'SiCloudflare', iconLib: 'si' },
      { name: 'Vercel', icon: 'SiVercel', iconLib: 'si' },
    ],
  },
  {
    category: 'Productivity & Design',
    skills: [
      { name: 'Notion', icon: 'SiNotion', iconLib: 'si' },
      { name: 'Canva', icon: 'SiCanva', iconLib: 'si' },
    ],
  },
]
