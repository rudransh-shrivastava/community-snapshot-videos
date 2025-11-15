'use client'

import type { Slide } from '@/types/slide'
import { toPng } from 'html-to-image'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { SlideContent } from './SlideContent'

interface SlideRendererProps {
  slide: Slide
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export interface SlideRendererHandle {
  capture: () => Promise<string>
}

const SlideRenderer = forwardRef<SlideRendererHandle, SlideRendererProps>(
  ({ slide, data }, ref) => {
    const slideRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      async capture() {
        if (!slideRef.current) {
          throw new Error('Slide ref is not available')
        }
        return toPng(slideRef.current, {
          cacheBust: true,
          height: 1080,
          pixelRatio: 1,
          skipFonts: true,
          style: {
            left: '0',
            opacity: '1',
            position: 'absolute',
            top: '0',
            transform: 'scale(1)',
          },
          width: 1920,
        })
      },
    }))

    return (
      <div
        className="light absolute aspect-video h-[1080px] w-[1920px] overflow-hidden border bg-white text-black"
        ref={slideRef}
        style={{ left: '-9999px' }} // Render offscreen
      >
        <SlideContent slide={slide} data={data} />
      </div>
    )
  }
)

SlideRenderer.displayName = 'SlideRenderer'

export { SlideRenderer }
