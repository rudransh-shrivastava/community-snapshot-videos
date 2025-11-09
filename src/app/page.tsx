'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function Home() {
  const [slides] = useState<Slide[]>([
    {
      id: 'xdsdfasdf',
      type: 'intro',
      script: 'when ball roll, just call saul',
      customization: {},
      data: { month: 'Sept', year: 2025, subtitle: 'yeah' },
    },
    { id: 'wpacdva', type: 'blank', script: '', customization: {}, data: { message: 'blank' } },
  ])

  const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
  return (
    <div className="bg-background text-foreground grid h-screen grid-cols-[10rem_2fr_1fr] grid-rows-[3rem_auto]">
      <div className="col-span-3 flex items-center justify-between border-b px-4">
        <div>owasp nest api hackathon</div>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          onClick={() => {
            document.body.classList.toggle('dark')
          }}
        >
          T
        </Button>
      </div>
      <div className="dark:border-r-border border-r border-r-transparent">
        {slides.map((slide, index) => (
          <div
            className={cn('flex cursor-pointer border border-transparent p-3', {
              'bg-secondary border-border': slide.id === currentSlide?.id,
            })}
            onClick={() => {
              setCurrentSlide({ ...slide })
            }}
            key={index}
          >
            <div className="px-2">
              <span>{index + 1}</span>
            </div>
            <div className="bg-primary aspect-video w-full">{slide.id}</div>
          </div>
        ))}
      </div>
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
      <div className="p-2">
        <Textarea
          placeholder="Type your Transcript here."
          value={currentSlide?.script}
          className="h-full"
        />
      </div>
    </div>
  )
}
