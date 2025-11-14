import { SlideComponentProps } from '@/types/slide'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import WorldMap from '../../../public/worldmap.png'

interface NewChapter {
  chapter: string
  lat: number
  lon: number
}

export function NewChaptersSlide({ data }: SlideComponentProps) {
  const newChapters: NewChapter[] = data?.newChapters || [
    { chapter: 'Somewhere, India', lat: 28.6139, lon: 77.209 },
    { chapter: 'Somwhere', lat: 30.245896, lon: 19.243239 },
    { chapter: 'Somewhere only we know', lat: 8.095344, lon: 77.487403 },
  ]

  const convertCoordsToStyle = (lat: number, lon: number) => {
    // the map is incomplete, it does not cover any area above greenland and anything below
    // south america so we need to account for that.
    const maxLat = 65.8
    const minLat = -55.98

    const maxLatRad = (maxLat * Math.PI) / 180
    const minLatRad = (minLat * Math.PI) / 180
    const latRad = (lat * Math.PI) / 180

    // Mercator projection y values
    const mercMax = Math.log(Math.tan(Math.PI / 4 + maxLatRad / 2))
    const mercMin = Math.log(Math.tan(Math.PI / 4 + minLatRad / 2))
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))

    const xPercent = ((lon + 180) / 360) * 100
    const yPercent = ((mercMax - mercN) / (mercMax - mercMin)) * 100

    return {
      top: `${yPercent}%`,
      left: `${xPercent}%`,
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-16 py-12 text-center">
      <h1 className="text-6xl font-bold">Welcoming New Chapters!</h1>
      <div className="relative w-full">
        {newChapters.map((chapter, index) => (
          <div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-full opacity-90"
            style={convertCoordsToStyle(chapter.lat, chapter.lon)}
          >
            <MapPin strokeWidth={1.5} size={48} />
            <span className="absolute top-full left-1/2 -translate-x-1/2 font-bold">
              {chapter.chapter}
            </span>
          </div>
        ))}
        <Image src={WorldMap} alt="Map of the world" />
      </div>
    </div>
  )
}
