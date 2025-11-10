import { slideRegistry } from '@/config/slides'
import type { Slide } from '@/types/slide'

export function CurrentSlide({
  currentSlide,
  fetchedData,
}: {
  currentSlide: Slide | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedData: any
}) {
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
    <div className="dark:bg-background bg-secondary flex items-center p-8">
      <div className="bg-background aspect-video w-full border">{renderContent()}</div>
    </div>
  )
}
