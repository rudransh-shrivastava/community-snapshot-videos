// Base slide interface
interface BaseSlide {
  id: string
  type: SlideType
  script: string
  customization: SlideCustomization
}

// Slide types
type SlideType = 'intro' | 'blank'

// Common customization options
interface SlideCustomization {
  bgColor?: string
  textColor?: string
}

// Specific slide data types
interface IntroSlideData {
  month: string
  year: number
  subtitle: string
}

// Typed slide variants
interface IntroSlide extends BaseSlide {
  type: 'intro'
  data: IntroSlideData
}

interface BlankSlideData {
  message: 'blank'
}

interface BlankSlide extends BaseSlide {
  type: 'blank'
  data: BlankSlideData
}

// Union type for all slides
export type Slide = IntroSlide | BlankSlide
