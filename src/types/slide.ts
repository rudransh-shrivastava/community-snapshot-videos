export interface Slide {
  id: string
  type: string
  title: string
  endpoint: string
  detailEndpointPattern?: string
  script?: string
  scriptGenerationPrompt?: string
  disableScriptGeneration?: boolean
  customization: {
    bgColor?: string
    textColor?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export interface SlideComponentProps {
  slide: Slide
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}
