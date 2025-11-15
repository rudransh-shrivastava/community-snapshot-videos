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

export interface Snapshot {
  created_at: string
  end_at: string
  key: string
  start_at: string
  title: string
  updated_at: string

  new_chapters_count: number
  new_issues_count: number
  new_projects_count: number
  new_releases_count: number
  new_users_count: number
}

export function slideConfigurations(snapshot: Snapshot): Partial<Slide>[] {
  const snapshotKey = snapshot.key
  return [
    {
      data: snapshot,
      disableScriptGeneration: true,
      id: 'intro-slide',
      script: `Welcome to ${snapshot.title}`,
      title: 'Welcome',
      type: 'intro',
    },
    {
      disableScriptGeneration: true,
      endpoint: '/api/v0/sponsors/',
      id: 'sponsors-slide',
      script: 'A big thank you to our sponsors who make our work possible.',
      title: 'Sponsors',
      type: 'sponsors',
    },
    {
      detailEndpointPattern: '/api/v0/projects/{key}',
      endpoint: `/api/v0/snapshots/${snapshotKey}/projects/`,
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
      endpoint: `/api/v0/snapshots/${snapshotKey}/chapters/`,
      id: 'new-chapters-slide',
      script: '',
      title: 'New Chapters',
      type: 'newChapters',
    },
    {
      endpoint: `/api/v0/snapshots/${snapshotKey}/releases/`,
      id: 'releases-slide',
      script: '',
      title: 'Releases',
      type: 'releases',
    },
    {
      disableScriptGeneration: true,
      endpoint: `/api/v0/snapshots/${snapshotKey}/members/`,
      id: 'new-contributors-slide',
      script: `This month, we had ${snapshot.new_users_count} new contributors`,
      title: 'New Contributors',
      type: 'newContributors',
    },
    {
      disableScriptGeneration: true,
      id: 'outro-slide',
      script: "Thank you for watching, stay tuned for the next month's snapshot",
      title: 'Thank You',
      type: 'outro',
    },
  ]
}
