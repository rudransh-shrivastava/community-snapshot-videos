import { PaginatedResponse, Sponsor } from '@/types/api'
import { SlideComponentProps } from '@/types/slide'
import Image from 'next/image'

export function SponsorsSlide({ slide, data }: SlideComponentProps) {
  const paginatedSponsors = data as PaginatedResponse<Sponsor> | undefined
  const sponsors = paginatedSponsors?.items || []

  return (
    <div className="flex h-full flex-col items-center justify-center p-12 text-center">
      <h1 className="mb-8 text-5xl font-bold">{slide.title}</h1>
      <div className="flex flex-wrap items-center justify-center gap-12">
        {sponsors.length > 0 ? (
          sponsors.map((sponsor) => (
            <div key={sponsor.name}>
              <Image src={sponsor.image_url} alt={sponsor.name} width={80} height={80} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">Click &quot;Fetch Data&quot; to load sponsors.</p>
        )}
      </div>
    </div>
  )
}
