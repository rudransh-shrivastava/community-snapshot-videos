'use client'

import { CurrentSlide } from '@/app/_components/CurrentSlide'
import { Navbar } from '@/app/_components/Navbar'
import { SideBarLeft } from '@/app/_components/SideBarLeft'
import { SideBarScript } from '@/app/_components/SideBarScript'
import type { Slide } from '@/types/slide'
import { useState } from 'react'

export function App() {
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
      <Navbar />
      <SideBarLeft slides={slides} setCurrentSlide={setCurrentSlide} currentSlide={currentSlide} />
      <CurrentSlide currentSlide={currentSlide} />
      <SideBarScript currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
    </div>
  )
}
