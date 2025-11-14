import { IntroSlide } from '@/app/_slides/IntroSlide'
import { NewChaptersSlide } from '@/app/_slides/NewChaptersSlide'
import { OutroSlide } from '@/app/_slides/OutroSlide'
import { ProjectsSlide } from '@/app/_slides/ProjectsSlide'
import { SponsorsSlide } from '@/app/_slides/SponsorsSlide'
import { Slide, SlideComponentProps } from '@/types/slide'
import { ComponentType } from 'react'

export const slideRegistry: Record<string, ComponentType<SlideComponentProps>> = {
  intro: IntroSlide,
  sponsors: SponsorsSlide,
  projects: ProjectsSlide,
  newChapters: NewChaptersSlide,
  outro: OutroSlide,
}

export const slideConfigurations: Partial<Slide>[] = [
  {
    id: 'intro-slide',
    type: 'intro',
    title: 'Welcome',
    script: 'Welcome to our presentation.',
  },
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
    endpoint: '/api/v0/snapshots/2025-02/projects',
    script: 'Here are some of the new projects from our community.',
  },
  {
    id: 'new-chapters-slide',
    type: 'newChapters',
    title: 'New Chapters',
    script: 'Here are the new chapters that have joined us.',
  },
  {
    id: 'outro-slide',
    type: 'outro',
    title: 'Thank You',
    script: 'Thank you for your attention.',
  },
]
