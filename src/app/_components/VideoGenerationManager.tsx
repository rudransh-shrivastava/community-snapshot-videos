'use client'

import { SlideRenderer, SlideRendererHandle } from '@/app/_components/SlideRenderer'
import type { Slide } from '@/types/slide'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { useEffect, useRef, useState } from 'react'

interface VideoGenerationManagerProps {
  slides: Slide[]
  scriptCache: Record<string, string>
  audioUrlCache: Record<string, string | null>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedDataCache: Record<string, any>
  onFinish: () => void
}

export function VideoGenerationManager({
  slides,
  scriptCache,
  audioUrlCache,
  fetchedDataCache,
  onFinish,
}: VideoGenerationManagerProps) {
  const [progress, setProgress] = useState('Initializing...')
  const ffmpegRef = useRef(new FFmpeg())
  const slideRendererRef = useRef<SlideRendererHandle>(null)
  const [slideIndexToRender, setSlideIndexToRender] = useState<number | null>(null)

  const startGeneration = async () => {
    setProgress('Loading video engine (FFmpeg)...')
    const ffmpeg = ffmpegRef.current
    ffmpeg.on('log', ({ message }) => {
      console.log(message) // For debugging
    })
    ffmpeg.on('progress', ({ progress, time }) => {
      setProgress(`Encoding... ${Math.round(progress * 100)}% (time: ${time / 1000}s)`)
    })

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    })
    setProgress('FFmpeg loaded.')

    const validSlides = slides.filter((slide) => scriptCache[slide.id])
    const videoSegments: string[] = []

    for (let i = 0; i < validSlides.length; i++) {
      const slide = validSlides[i]
      setProgress(`Processing slide ${i + 1}/${validSlides.length}: ${slide.title}`)

      // Render slide and capture image
      setSlideIndexToRender(slides.indexOf(slide))
      await new Promise((resolve) => setTimeout(resolve, 100))
      if (!slideRendererRef.current) continue

      const dataUrl = await slideRendererRef.current.capture()
      const imageBlob = await (await fetch(dataUrl)).blob()
      await ffmpeg.writeFile('image.png', new Uint8Array(await imageBlob.arrayBuffer()))

      // Get audio
      const audioUrl = audioUrlCache[slide.id]
      const audioData = audioUrl ? await fetchFile(audioUrl) : await fetchFile('/test-audio.wav')
      await ffmpeg.writeFile('audio.wav', audioData)

      // Create video segment
      const segmentName = `slide_${i}.mp4`
      await ffmpeg.exec([
        '-loop',
        '1',
        '-i',
        'image.png',
        '-i',
        'audio.wav',
        '-c:v',
        'libx264',
        '-tune',
        'stillimage',
        '-c:a',
        'aac',
        '-b:a',
        '192k',
        '-pix_fmt',
        'yuv420p',
        '-shortest',
        segmentName,
      ])
      videoSegments.push(segmentName)
    }

    // Concatenate videos
    setProgress('Combining video segments...')
    const concatFileContent = videoSegments.map((name) => `file '${name}'`).join('\n')
    await ffmpeg.writeFile('concat.txt', concatFileContent)

    await ffmpeg.exec([
      '-f',
      'concat',
      '-safe',
      '0',
      '-i',
      'concat.txt',
      '-c',
      'copy',
      'output.mp4',
    ])

    // Download final video
    setProgress('Finishing up...')
    const data = (await ffmpeg.readFile('output.mp4')) as Uint8Array
    const blob = new Blob([data.buffer as BlobPart], { type: 'video/mp4' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'presentation.mp4'
    a.click()
    URL.revokeObjectURL(url)

    setProgress('Done!')
    onFinish()
  }

  useEffect(() => {
    startGeneration()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const slideToRender = slideIndexToRender !== null ? slides[slideIndexToRender] : null

  return (
    <>
      {slideToRender && (
        <SlideRenderer
          ref={slideRendererRef}
          slide={slideToRender}
          data={fetchedDataCache[slideToRender.id]}
        />
      )}
      <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="rounded-lg bg-white p-8 text-black">
          <h2 className="text-xl font-bold">Generating Video</h2>
          <p className="mt-4">{progress}</p>
        </div>
      </div>
    </>
  )
}
