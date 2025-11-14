import { SlideComponentProps } from '@/types/slide'

export function IntroSlide({ slide }: SlideComponentProps) {
  console.log(slide)
  return (
    <div className="flex h-full flex-col items-center justify-center p-12 text-center">
      <h1 className="text-6xl font-bold">September 2025 OWASP Community Snapshot</h1>
      <p className="mt-8 text-4xl">Sep 1, 2025 - Oct 1, 2025 </p>
    </div>
  )
}
