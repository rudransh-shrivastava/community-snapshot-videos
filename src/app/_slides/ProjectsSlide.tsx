import { SlideComponentProps } from '@/types/slide'

interface Project {
  name: string
  description: string
}

export function ProjectsSlide({ slide, data }: SlideComponentProps) {
  const projects = Array.isArray(data) ? (data as Project[]) : []

  return (
    <div className="flex h-full flex-col items-center justify-center p-12 text-center">
      <h1 className="mb-8 text-5xl font-bold">{slide.title}</h1>
      <div className="flex flex-col gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.name}>
              <h2 className="text-2xl font-bold">{project.name}</h2>
              <p>{project.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Click &quot;Fetch Data&quot; to load projects.</p>
        )}
      </div>
    </div>
  )
}
