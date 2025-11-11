import { SlideComponentProps } from '@/types/slide'

export function OutroSlide({ slide }: SlideComponentProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-12 text-center">
      <h1 className="text-6xl font-bold">{slide.title}</h1>
    </div>
  )
}
