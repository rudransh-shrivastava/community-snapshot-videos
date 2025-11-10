'use client'

import { CurrentSlide } from '@/app/_components/CurrentSlide'
import { Navbar } from '@/app/_components/Navbar'
import { SideBarLeft } from '@/app/_components/SideBarLeft'
import { SideBarScript } from '@/app/_components/SideBarScript'
import { slideConfigurations } from '@/config/slides'
import type { Slide } from '@/types/slide'
import { useState } from 'react'

export function App() {
  const [slides] = useState<Slide[]>(
    slideConfigurations.map(
      (s) =>
        ({
          ...s,
          data: {},
          customization: {},
        }) as Slide
    )
  )
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(slides[0] || null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fetchedData, setFetchedData] = useState<any>(null)

  return (
    <div className="bg-background text-foreground grid h-screen grid-cols-[10rem_2fr_1fr] grid-rows-[3rem_auto]">
      <Navbar />
      <SideBarLeft slides={slides} setCurrentSlide={setCurrentSlide} currentSlide={currentSlide} />
      <CurrentSlide currentSlide={currentSlide} fetchedData={fetchedData} />
      <SideBarScript
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        fetchedData={fetchedData}
        setFetchedData={setFetchedData}
      />
    </div>
  )
}
