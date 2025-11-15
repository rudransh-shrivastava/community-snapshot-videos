import { ChartBarHorizontal } from '@/components/ui/char-bar-horizontal'
import { SlideComponentProps } from '@/types/slide'

interface Release {
  created_at: string
  name: string
  published_at: string
  tag_name: string
  organization_login: string | null
  repository_name: string
}

export function ReleasesSlide({ data }: SlideComponentProps) {
  const releases = data || ([] as Release[])
  const counts: Record<string, number> = {}
  for (const release of releases) {
    const repoName = release.repository_name
    counts[repoName] = (counts[repoName] || 0) + 1
  }
  const repoEntries = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map((entry) => ({ project: entry[0], releases: entry[1] }))
    .slice(0, 10)

  return (
    <div className="flex h-full flex-col items-center justify-center p-12 text-center">
      <div className="w-2/5 scale-200">
        <ChartBarHorizontal chartData={repoEntries} />
      </div>
    </div>
  )
}
