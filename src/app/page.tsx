'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export default function Home() {
  const [slides] = useState([0, 0, 0, 0, 0])
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
      <div className="dark:bg-background bg-secondary border-r">
        {slides.map((slide, index) => (
          <div className="flex p-3" key={index}>
            <div className="px-2">
              <span>{index + 1}</span>
            </div>
            <div className="bg-primary aspect-video w-full">{slide}</div>
          </div>
        ))}
      </div>
      <div className="dark:bg-background bg-secondary flex items-center p-8">
        <div className="bg-primary aspect-video w-full"></div>
      </div>
      <div className="p-2">
        <Textarea placeholder="Type your Transcript here." className="h-full" />
      </div>
    </div>
  )
}
