import { SlideComponentProps } from '@/types/slide'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import WorldMap from '../../../public/worldmap.png'

interface Chapter {
  created_at: string
  key: string
  name: string
  updated_at: string
  longitude: number
  latitude: number
  country?: string
  leaders?: string[]
  region?: string
}

export function NewChaptersSlide({ data }: SlideComponentProps) {
  const newChapters: Chapter[] = data || []

  console.log('new cha', newChapters)

  const convertCoordsToStyle = (lat: number, lon: number) => {
    // the map is incomplete, it does not cover any area above greenland and anything below
    // south america so we need to account for that.
    const maxLat = 65.8
    const minLat = -55.98

    const maxLatRad = (maxLat * Math.PI) / 180
    const minLatRad = (minLat * Math.PI) / 180
    const latRad = (lat * Math.PI) / 180

    const mercMax = Math.log(Math.tan(Math.PI / 4 + maxLatRad / 2))
    const mercMin = Math.log(Math.tan(Math.PI / 4 + minLatRad / 2))
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))

    // 4 deg adjustment
    const xPercent = ((lon + 180) / (360 + 4)) * 100
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
            style={convertCoordsToStyle(chapter.latitude, chapter.longitude)}
          >
            <MapPin strokeWidth={1.5} size={32} />
            <span className="absolute top-full left-1/2 -translate-x-1/2 font-bold"></span>
          </div>
        ))}
        <Image src={WorldMap} alt="Map of the world" />
      </div>
    </div>
  )
}
