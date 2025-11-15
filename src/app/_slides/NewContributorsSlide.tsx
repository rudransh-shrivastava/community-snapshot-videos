import { SlideComponentProps } from '@/types/slide'
import Image from 'next/image'
export interface Contributor {
  avatar_url: string
  created_at: string
  login: string
  name: string
  updated_at: string
  url: string
}

export const NewContributorsSlide = ({ data }: SlideComponentProps) => {
  const newContributors = (data || []) as Contributor[]
  const size = 96
  return (
    <div className="flex h-full flex-col gap-16 py-12">
      <h1 className="text-center text-6xl font-bold">New Contributors</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {newContributors.map((contributor, index) => (
          <div key={index} className="flex min-w-80 items-center gap-4 rounded-md border p-4">
            <div>
              <Image
                src={contributor.avatar_url}
                alt="User Profile Picture"
                width={size}
                height={size}
                className="size-12 shrink-0 rounded-full"
              />
            </div>
            <span className="text-2xl">{contributor.login}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
