import { ProjectsSlide } from '@/app/_slides/ProjectsSlide'
import { SponsorsSlide } from '@/app/_slides/SponsorsSlide'
import { Slide, SlideComponentProps } from '@/types/slide'
import { ComponentType } from 'react'

export const slideRegistry: Record<string, ComponentType<SlideComponentProps>> = {
  sponsors: SponsorsSlide,
  projects: ProjectsSlide,
}

export const slideConfigurations: Partial<Slide>[] = [
  {
    id: 'sponsors-slide',
    type: 'sponsors',
    title: 'Sponsors',
    endpoint: '/api/v0/sponsors',
    script: 'A big thank you to our sponsors who make our work possible.',
  },
  {
    id: 'projects-slide',
    type: 'projects',
    title: 'New Projects',
    endpoint: '/api/v0/projects',
    script: 'Here are some of the new projects from our community.',
  },
]
