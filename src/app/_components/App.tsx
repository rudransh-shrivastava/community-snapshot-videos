'use client'

import { CurrentSlide } from '@/app/_components/CurrentSlide'
import { Navbar } from '@/app/_components/Navbar'
import { SideBarLeft } from '@/app/_components/SideBarLeft'
import { SideBarScript } from '@/app/_components/SideBarScript'
import { VideoGenerationManager } from '@/app/_components/VideoGenerationManager'
import type { Snapshot } from '@/config/slides'
import { slideConfigurations } from '@/config/slides'
import { NEST_API_URL } from '@/lib/constants'
import type { Slide } from '@/types/slide'
import axios from 'axios'
import { useEffect, useState } from 'react'

export type ProcessingTask = 'data' | 'script' | 'audio'

export interface ProcessingSlide {
  id: string
  task: ProcessingTask
}
export function App({ snapshotId }: { snapshotId: string }) {
  const snapshot_url = `${NEST_API_URL}/api/v0/snapshots/${snapshotId}`
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(snapshot_url)
      .then((response) => {
        setSnapshot(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching snapshot:', error)
        setLoading(false)
      })
  }, [snapshot_url])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!snapshot) {
    return <div className="p-16 text-center">Snapshot not found</div>
  }

  return <SnapshotShow snapshot={snapshot} />
}

function SnapshotShow({ snapshot }: { snapshot: Snapshot }) {
  const [slides] = useState<Slide[]>(
    slideConfigurations(snapshot).map(
      (s) =>
        ({
          ...s,
          data: s.data || {},
          customization: {},
        }) as Slide
    )
  )
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(slides[0] || null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fetchedDataCache, setFetchedDataCache] = useState<Record<string, any>>({})
  const [scriptCache, setScriptCache] = useState<Record<string, string>>(
    Object.fromEntries(slides.filter((s) => s.script).map((s) => [s.id, s.script as string]))
  )
  const [audioUrlCache, setAudioUrlCache] = useState<Record<string, string | null>>({})
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false)
  const [processingSlide, setProcessingSlide] = useState<ProcessingSlide | null>(null)

  const validSlides = slides.filter((slide) => scriptCache[slide.id] && audioUrlCache[slide.id])
  const isGenerateDisabled = validSlides.length === 0

  return (
    <>
      <div className="bg-background text-foreground grid h-screen grid-cols-[10rem_1fr_24rem] grid-rows-[3rem_auto]">
        <Navbar
          onGenerateVideo={() => setIsGeneratingVideo(true)}
          snapshotId={snapshot.key}
          isGenerateDisabled={isGenerateDisabled}
        />
        <SideBarLeft
          slides={slides}
          setCurrentSlide={setCurrentSlide}
          currentSlide={currentSlide}
          scriptCache={scriptCache}
          processingSlide={processingSlide}
          fetchedDataCache={fetchedDataCache}
          audioUrlCache={audioUrlCache}
        />
        <CurrentSlide
          currentSlide={currentSlide}
          fetchedData={currentSlide ? fetchedDataCache[currentSlide.id] : null}
        />
        <SideBarScript
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          fetchedData={currentSlide ? fetchedDataCache[currentSlide.id] : null}
          setFetchedDataCache={setFetchedDataCache}
          scriptCache={scriptCache}
          setScriptCache={setScriptCache}
          audioUrlCache={audioUrlCache}
          setAudioUrlCache={setAudioUrlCache}
          processingSlide={processingSlide}
          setProcessingSlide={setProcessingSlide}
        />
      </div>
      {isGeneratingVideo && (
        <VideoGenerationManager
          slides={slides}
          scriptCache={scriptCache}
          audioUrlCache={audioUrlCache}
          fetchedDataCache={fetchedDataCache}
          onFinish={() => setIsGeneratingVideo(false)}
        />
      )}
    </>
  )
}
