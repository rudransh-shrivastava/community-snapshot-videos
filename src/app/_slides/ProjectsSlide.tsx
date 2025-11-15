import { SlideComponentProps } from '@/types/slide'

type Project = {
  created_at: string
  key: string
  level: string
  name: string
  updated_at: string
  description: string
  leaders: string[]
}

export function ProjectsSlide({ slide, data }: SlideComponentProps) {
  const projects = (data || []) as Project[]

  return (
    <div className="flex h-full flex-col items-center p-12 text-center">
      <h1 className="mb-12 text-6xl font-bold">{slide.title}</h1>
      <div className="grid grid-cols-4 gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.name}
              className="flex flex-col gap-2 rounded-lg border-2 border-black/5 p-4 text-2xl"
            >
              <span className="font-bold">{project.name}</span>
              <div>{project.leaders.join(', ')}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Click &quot;Fetch Data&quot; to load projects.</p>
        )}
      </div>
    </div>
  )
}
