import { ChartBarHorizontal } from '@/components/ui/char-bar-horizontal'
import { SlideComponentProps } from '@/types/slide'

export function ReleasesSlide({ slide }: SlideComponentProps) {
  console.log(slide)
  return (
    <div className="flex h-full flex-col items-center justify-center p-12 text-center">
      <div className="w-2/5 scale-200">
        <ChartBarHorizontal />
      </div>
    </div>
  )
}
