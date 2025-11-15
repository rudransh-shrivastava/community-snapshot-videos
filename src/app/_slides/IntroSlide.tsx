import { SlideComponentProps } from '@/types/slide'

export function IntroSlide({ slide }: SlideComponentProps) {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  } as Intl.DateTimeFormatOptions

  const startDate = new Date(slide.data.start_at)
  startDate.setUTCMonth(startDate.getUTCMonth())
  const endDate = new Date(slide.data.start_at)
  endDate.setUTCMonth(endDate.getUTCMonth() + 1)

  const formattedStart = startDate.toLocaleDateString('en-US', options)
  const formattedEnd = endDate.toLocaleDateString('en-US', options)

  const monthNameOptions = { month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions
  const monthName = startDate.toLocaleDateString(undefined, monthNameOptions)

  return (
    <div className="flex h-full flex-col items-center justify-center p-12 text-center">
      <h1 className="text-6xl font-bold">{monthName} OWASP Community Snapshot</h1>
      <p className="mt-8 text-4xl">
        {formattedStart} - {formattedEnd}
      </p>
    </div>
  )
}
