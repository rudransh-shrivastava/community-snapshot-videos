import { IntroSlide } from '@/app/_slides/IntroSlide'
import { NewChaptersSlide } from '@/app/_slides/NewChaptersSlide'
import { OutroSlide } from '@/app/_slides/OutroSlide'
import { ProjectsSlide } from '@/app/_slides/ProjectsSlide'
import { ReleasesSlide } from '@/app/_slides/ReleasesSlide'
import { SponsorsSlide } from '@/app/_slides/SponsorsSlide'
import { Slide, SlideComponentProps } from '@/types/slide'
import { ComponentType } from 'react'

export const slideRegistry: Record<string, ComponentType<SlideComponentProps>> = {
  intro: IntroSlide,
  sponsors: SponsorsSlide,
  projects: ProjectsSlide,
  newChapters: NewChaptersSlide,
  releases: ReleasesSlide,
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
    endpoint: '/api/v0/sponsors/',
    script: 'A big thank you to our sponsors who make our work possible.',
  },
  {
    id: 'projects-slide',
    type: 'projects',
    title: 'New Projects',
    endpoint: '/api/v0/snapshots/2025-02/projects/',
    detailEndpointPattern: '/api/v0/projects/{key}',
    script: 'Here are some of the new projects from our community.',
    scriptGenerationPrompt: `
      You are a scriptwriter for a tech presentation.
      Your task is to generate a script for a presentation slide.
      The script should be simple and direct.
      Based on the data provided, state the name of the project and its leaders.
      Do not add any extra words, introduction or conclusion.
      For example, if the data is about a project named "OWASP Top 10" with leaders "John Doe" and "Jane Doe", the script should be something like: "OWASP Top 10, led by John Doe and Jane Doe."
      Start the presentation with the text: "Here are some of the new projects from our community."
    `,
  },
  {
    id: 'new-chapters-slide',
    type: 'newChapters',
    title: 'New Chapters',
    script: 'Here are the new chapters that have joined us.',
  },
  {
    id: 'releases-slide',
    type: 'releases',
    title: 'Releases',
    script: 'Here are the latest releases from our community.',
  },
  {
    id: 'outro-slide',
    type: 'outro',
    title: 'Thank You',
    script: 'Thank you for your attention.',
  },
]
