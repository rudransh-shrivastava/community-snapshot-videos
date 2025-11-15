import { IntroSlide } from '@/app/_slides/IntroSlide'
import { NewChaptersSlide } from '@/app/_slides/NewChaptersSlide'
import { NewContributorsSlide } from '@/app/_slides/NewContributorsSlide'
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
  newContributors: NewContributorsSlide,
  outro: OutroSlide,
}

export const slideConfigurations: Partial<Slide>[] = [
  {
    disableScriptGeneration: true,
    id: 'intro-slide',
    script: '',
    title: 'Welcome',
    type: 'intro',
  },
  {
    disableScriptGeneration: true,
    endpoint: '/api/v0/sponsors/',
    id: 'sponsors-slide',
    script: '',
    title: 'Sponsors',
    type: 'sponsors',
  },
  {
    detailEndpointPattern: '/api/v0/projects/{key}',
    endpoint: '/api/v0/snapshots/2025-02/projects/',
    id: 'projects-slide',
    script: '',
    scriptGenerationPrompt: `
      You are a scriptwriter for a tech presentation.
      Your task is to generate a script for a presentation slide.
      The script should be simple and direct.
      Based on the data provided, state the name of the project and its leaders.
      Do not add any extra words, introduction or conclusion.
      For example, if the data is about a project named "OWASP Top 10" with leaders "John Doe" and "Jane Doe", the script should be something like: "OWASP Top 10, led by John Doe and Jane Doe."
      Start the presentation with the text: "Here are some of the new projects from our community."
    `,
    title: 'New Projects',
    type: 'projects',
  },
  {
    detailEndpointPattern: '/api/v0/chapters/{key}',
    endpoint: '/api/v0/snapshots/2025-02/chapters/',
    id: 'new-chapters-slide',
    script: '',
    title: 'New Chapters',
    type: 'newChapters',
  },
  {
    endpoint: '/api/v0/snapshots/2025-02/releases/',
    id: 'releases-slide',
    script: '',
    title: 'Releases',
    type: 'releases',
  },
  {
    disableScriptGeneration: true,
    endpoint: '/api/v0/snapshots/2025-02/members/',
    id: 'new-contributors-slide',
    script: '',
    title: 'New Contributors',
    type: 'newContributors',
  },
  {
    disableScriptGeneration: true,
    id: 'outro-slide',
    script: '',
    title: 'Thank You',
    type: 'outro',
  },
]
