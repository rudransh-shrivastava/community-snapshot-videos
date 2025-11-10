import { cn } from '@/lib/utils'
import type { Slide } from '@/types/slide'
import { Dispatch, SetStateAction } from 'react'

export function SideBarLeft({
  slides,
  setCurrentSlide,
  currentSlide,
}: {
  slides: Slide[]
  currentSlide: Slide | null
  setCurrentSlide: Dispatch<SetStateAction<Slide | null>>
}) {
  return (
    <div className="dark:border-r-border border-r border-r-transparent">
      {slides.map((slide, index) => (
        <div
          className={cn('flex cursor-pointer border border-transparent p-3', {
            'bg-secondary border-border': slide.id === currentSlide?.id,
          })}
          onClick={() => {
            setCurrentSlide({ ...slide })
          }}
          key={index}
        >
          <div className="px-2">
            <span>{index + 1}</span>
          </div>
          <div className="flex aspect-video w-full items-center justify-center border bg-white p-2">
            <span className="text-xs text-gray-500">{slide.id}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
