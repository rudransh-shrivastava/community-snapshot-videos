import type { Slide } from '@/types/slide'
import { useEffect, useRef, useState } from 'react'
import { SlideContent } from './SlideContent'

export function CurrentSlide({
  currentSlide,
  fetchedData,
}: {
  currentSlide: Slide | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedData: any
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScale = () => {
      const { width, height } = container.getBoundingClientRect()
      setScale(Math.min(width / 1920, height / 1080))
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="dark:bg-background bg-secondary mx-2 ml-4 flex flex-col items-center justify-center gap-4 p-8"
      ref={containerRef}
    >
      <div className="relative flex w-full flex-1 items-center justify-center">
        <div
          className="light absolute aspect-video h-[1080px] overflow-hidden border bg-white text-black transition-all"
          ref={slideRef}
          style={{ transform: `scale(${scale})`, opacity: scale === 0 ? 0 : 1 }}
        >
          {currentSlide ? (
            <SlideContent slide={currentSlide} data={fetchedData} />
          ) : (
            <div className="flex h-full w-full items-center justify-center">No Slide Selected</div>
          )}
        </div>
      </div>
    </div>
  )
}
