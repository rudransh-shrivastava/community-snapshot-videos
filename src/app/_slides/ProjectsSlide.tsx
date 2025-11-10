import { SlideComponentProps } from '@/types/slide'
import { Folder, GitForkIcon, InfoIcon, Star, Users } from 'lucide-react'

export function ProjectsSlide({ slide, data }: SlideComponentProps) {
  // const paginatedProjects = data as PaginatedResponse<Project> | undefined
  // const projects = Array.isArray(data) ? (data as Project[]) : []

  console.log(data)

  const projects = [
    {
      created_at: '2025-02-07T17:49:37Z',
      key: 'top-10-for-business-logic-abuse',
      level: 'incubator',
      name: 'OWASP Top 10 for Business Logic Abuse',
      leaders: ['Name LastName'],
      description: 'asdf',
      updated_at: '2025-06-04T05:04:32Z',
    },
  ]

  const temp = { stars: 4430000, forks: 12, issues: 13, repositories: 2, contributors: 92, maintainers: ['Me', 'Him'] }

  return (
    <div className="flex h-full flex-col items-center p-8 text-center">
      <h1 className="mb-4 text-6xl font-bold">{slide.title}</h1>
      <div className="grid grid-cols-4 gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.name}
              className="flex flex-col gap-2 rounded-lg border-2 border-black/5 p-4 text-2xl"
            >
              <span className="font-bold">{project.name}</span>
              <div>{temp.maintainers.join(', ')}</div>
              <div className="flex justify-center gap-4">
                <div className="flex gap-1">
                  <Star className="opacity-75" />
                  <span>{temp.stars.toLocaleString()}</span>
                </div>
                <div className="flex gap-1">
                  <GitForkIcon className="opacity-75" />
                  <span>{temp.forks.toLocaleString()}</span>
                </div>
                <div className="flex gap-1">
                  <Users className="opacity-75" />
                  <span>{temp.contributors.toLocaleString()}</span>
                </div>
                <div className="flex gap-1">
                  <InfoIcon className="opacity-75" />
                  <span>{temp.issues.toLocaleString()}</span>
                </div>
                <div className="flex gap-1">
                  <Folder className="opacity-75" />
                  <span>{temp.repositories.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Click &quot;Fetch Data&quot; to load projects.</p>
        )}
      </div>
    </div>
  )
}
