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
    id: 'intro-slide',
    script: 'Welcome to our presentation.',
    title: 'Welcome',
    type: 'intro',
  },
  {
    endpoint: '/api/v0/sponsors/',
    id: 'sponsors-slide',
    script: 'A big thank you to our sponsors who make our work possible.',
    title: 'Sponsors',
    type: 'sponsors',
  },
  {
    detailEndpointPattern: '/api/v0/projects/{key}',
    endpoint: '/api/v0/snapshots/2025-02/projects/',
    id: 'projects-slide',
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
    title: 'New Projects',
    type: 'projects',
  },
  {
    id: 'new-chapters-slide',
    script: 'Here are the new chapters that have joined us.',
    title: 'New Chapters',
    type: 'newChapters',
  },
  {
    id: 'releases-slide',
    script: 'Here are the latest releases from our community.',
    title: 'Releases',
    type: 'releases',
  },
  {
    id: 'new-contributors-slide',
    script: "Let's welcome our new contributors!",
    title: 'New Contributors',
    type: 'newContributors',
  },
  {
    id: 'outro-slide',
    script: 'Thank you for your attention.',
    title: 'Thank You',
    type: 'outro',
  },
]
