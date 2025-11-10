import { slideRegistry } from '@/config/slides'
import type { Slide } from '@/types/slide'
import { useEffect, useRef, useState } from 'react'

export function CurrentSlide({
  currentSlide,
  fetchedData,
}: {
  currentSlide: Slide | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedData: any
}) {
  const containerRef = useRef<HTMLDivElement>(null)
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

  const renderContent = () => {
    if (!currentSlide) {
      return <div className="flex h-full w-full items-center justify-center">No Slide Selected</div>
    }

    if (!currentSlide.type) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          Error: Slide has no type.
        </div>
      )
    }

    const SlideComponent = slideRegistry[currentSlide.type]

    if (!SlideComponent) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          Error: Component for slide type &quot;{currentSlide.type}&quot; not found.
        </div>
      )
    }

    return <SlideComponent slide={currentSlide} data={fetchedData} />
  }

  return (
    <div
      className="dark:bg-background bg-secondary mx-2 ml-4 flex items-center justify-center p-8"
      ref={containerRef}
    >
      <div
        className="absolute aspect-video h-[1080px] border bg-white text-black"
        style={{ transform: `scale(${scale})` }}
      >
        {renderContent()}
      </div>
    </div>
  )
}
