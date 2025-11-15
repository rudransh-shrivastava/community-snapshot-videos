import { slideRegistry } from '@/config/slides'
import type { Slide } from '@/types/slide'

interface SlideContentProps {
  slide: Slide
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export function SlideContent({ slide, data }: SlideContentProps) {
  if (!slide.type) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Error: Slide has no type.
      </div>
    )
  }

  const SlideComponent = slideRegistry[slide.type]

  if (!SlideComponent) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Error: Component for slide type &quot;{slide.type}&quot; not found.
      </div>
    )
  }

  return <SlideComponent slide={slide} data={data} />
}
