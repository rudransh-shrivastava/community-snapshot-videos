import type { Slide } from '@/types/slide'

export function CurrentSlide({ currentSlide }: { currentSlide: Slide | null }) {
  return (
    <div className="dark:bg-background bg-secondary flex items-center p-8">
      <div className="bg-background aspect-video w-full border">
        {currentSlide ? (
          <div className="flex h-full w-full items-center justify-center">
            {JSON.stringify(currentSlide, null, 2)}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">No Slide Selected</div>
        )}
      </div>
    </div>
  )
}
