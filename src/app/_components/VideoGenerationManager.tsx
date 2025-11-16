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

  const [hasStarted, setHasStarted] = useState(false)
  const currentTaskRef = useRef('')

  const startGeneration = async () => {
    setHasStarted(true)
    setProgress('Loading video engine (FFmpeg)...')
    const ffmpeg = ffmpegRef.current
    ffmpeg.on('log', ({ message }) => {
      console.log(message) // For debugging
    })
    ffmpeg.on('progress', ({ progress, time }) => {
      const message = `${currentTaskRef.current} ${Math.round(progress * 100)}% (time: ${
        time / 100000
      }s)`
      setProgress(message)
    })

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    })
    setProgress('FFmpeg loaded.')

    const validSlides = slides.filter((slide) => scriptCache[slide.id] && audioUrlCache[slide.id])
    setProgress(`Found ${validSlides.length} slides to generate.`)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const videoSegments: string[] = []

    for (let i = 0; i < validSlides.length; i++) {
      const slide = validSlides[i]
      const slideProgressPrefix = `[${i + 1}/${validSlides.length}]`
      const imageName = `image_${i}.png`
      const audioName = `audio_${i}.wav`
      const segmentName = `slide_${i}.mp4`

      setProgress(`${slideProgressPrefix} Rendering slide: ${slide.title}`)
      setSlideIndexToRender(slides.indexOf(slide))
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for render
      if (!slideRendererRef.current) continue

      setProgress(`${slideProgressPrefix} Capturing slide image...`)
      const dataUrl = await slideRendererRef.current.capture()
      const imageBlob = await (await fetch(dataUrl)).blob()
      await ffmpeg.writeFile(imageName, new Uint8Array(await imageBlob.arrayBuffer()))

      setProgress(`${slideProgressPrefix} Preparing audio...`)
      const audioUrl = audioUrlCache[slide.id]
      if (!audioUrl) continue
      const audioData = await fetchFile(audioUrl)
      await ffmpeg.writeFile(audioName, audioData)

      currentTaskRef.current = `${slideProgressPrefix} Encoding video segment...`
      await ffmpeg.exec([
        '-loop',
        '1',
        '-i',
        imageName,
        '-i',
        audioName,
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
      await ffmpeg.deleteFile(imageName)
      await ffmpeg.deleteFile(audioName)
    }

    currentTaskRef.current = 'Combining all video segments...'
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
    const validSlides = slides.filter((slide) => scriptCache[slide.id])
    if (!hasStarted && validSlides.length > 0) {
      startGeneration()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptCache, slides, hasStarted])

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
