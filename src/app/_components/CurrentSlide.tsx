import { toPng } from 'html-to-image'
import { Download } from 'lucide-react'
import { slideRegistry } from '@/config/slides'
import type { Slide } from '@/types/slide'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

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
  const [isDownloading, setIsDownloading] = useState(false)
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

  const handleDownload = async () => {
    if (!slideRef.current || !currentSlide) return

    setIsDownloading(true)
    try {
      const dataUrl = await toPng(slideRef.current, {
        cacheBust: true,
        height: 1080,
        pixelRatio: 1,
        skipFonts: true,
        style: {
          left: '0',
          opacity: '1',
          position: 'absolute',
          top: '0',
          transform: 'scale(1)',
        },
        width: 1920,
      })

      const link = document.createElement('a')
      link.download = `slide-${currentSlide.type || 'export'}-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Failed to download image:', error)
    } finally {
      setIsDownloading(false)
    }
  }

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
    className="dark:bg-background bg-secondary mx-2 ml-4 flex flex-col items-center justify-center p-8 gap-4"
    ref={containerRef}
  >
    <div className="relative w-full flex-1 flex items-center justify-center">
      <div
        className="light absolute aspect-video h-[1080px] overflow-hidden border bg-white text-black transition-all"
        ref={slideRef}
        style={{ transform: `scale(${scale})`, opacity: scale === 0 ? 0 : 1 }}
      >
        {renderContent()}
      </div>
    </div>
    <Button onClick={handleDownload} disabled={isDownloading || !currentSlide}>
      <Download />
      {isDownloading ? 'Downloading...' : 'Download Image'}
    </Button>
  </div>
)
}
