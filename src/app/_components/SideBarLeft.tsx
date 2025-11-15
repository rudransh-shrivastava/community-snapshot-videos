import { ProcessingSlide } from '@/app/_components/App'
import { StatusIndicator } from '@/app/_components/StatusIndicator'
import { cn } from '@/lib/utils'
import type { Slide } from '@/types/slide'
import { Dispatch, SetStateAction } from 'react'

export function SideBarLeft({
  slides,
  setCurrentSlide,
  currentSlide,
  scriptCache,
  processingSlide,
  fetchedDataCache,
  audioUrlCache,
}: {
  slides: Slide[]
  currentSlide: Slide | null
  setCurrentSlide: Dispatch<SetStateAction<Slide | null>>
  scriptCache: Record<string, string>
  processingSlide: ProcessingSlide | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedDataCache: Record<string, any>
  audioUrlCache: Record<string, string | null>
}) {
  return (
    <div className="dark:border-r-border border-r border-r-transparent">
      {slides.map((slide, index) => {
        const cachedScript = scriptCache[slide.id]
        const slideWithLatestScript = cachedScript ? { ...slide, script: cachedScript } : slide

        return (
          <div
            className={cn('flex cursor-pointer flex-col border border-transparent p-3', {
              'bg-secondary border-border': slide.id === currentSlide?.id,
            })}
            onClick={() => {
              setCurrentSlide(slideWithLatestScript)
            }}
            key={index}
          >
            <div className="flex items-start">
              <div className="px-2">
                <span>{index + 1}</span>
              </div>
              <div className="flex aspect-video w-full items-center justify-center border bg-white p-2">
                <span className="text-center text-xs text-gray-500">{slide.id}</span>
              </div>
            </div>
            <div className="mt-2 flex justify-center">
              <StatusIndicator
                slide={slide}
                processingSlide={processingSlide}
                fetchedDataCache={fetchedDataCache}
                scriptCache={scriptCache}
                audioUrlCache={audioUrlCache}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
