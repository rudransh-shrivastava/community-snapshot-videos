import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { enrichItems, fetchAllPages } from '@/lib/api'
import { NEST_API_URL } from '@/lib/constants'
import type { Slide } from '@/types/slide'
import { Play } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

export function SideBarScript({
  currentSlide,
  setCurrentSlide,
  fetchedData,
  setFetchedDataCache,
}: {
  currentSlide: Slide | null
  setCurrentSlide: Dispatch<SetStateAction<Slide | null>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedData: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFetchedDataCache: Dispatch<SetStateAction<Record<string, any>>>
}) {
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [isGeneratingScript, setIsGeneratingScript] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetchData = async () => {
    if (!currentSlide || !currentSlide.endpoint) {
      setError('No endpoint configured for the current slide.')
      return
    }

    setIsFetchingData(true)
    setError(null)

    setFetchedDataCache((prev) => ({ ...prev, [currentSlide.id]: null }))

    const listEndpoint = `${NEST_API_URL}${currentSlide.endpoint}`

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let items = await fetchAllPages<{ [key: string]: any }>(listEndpoint)

      if (currentSlide.detailEndpointPattern) {
        const detailPattern = `${NEST_API_URL}${currentSlide.detailEndpointPattern}`
        items = await enrichItems(items, detailPattern)
      }

      setFetchedDataCache((prev) => ({ ...prev, [currentSlide.id]: items }))
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setIsFetchingData(false)
    }
  }

  const handleGenerateScript = async () => {
    if (!currentSlide) {
      setError('No slide selected.')
      return
    }
    if (!fetchedData) {
      setError('No data fetched. Please use Fetch Data Button')
      return
    }

    setIsGeneratingScript(true)
    setError(null)

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slide: { ...currentSlide, data: fetchedData },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate script')
      }

      const { script } = await response.json()
      setCurrentSlide((prev) => (prev ? { ...prev, script } : prev))
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setIsGeneratingScript(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="dark:bg-secondary/30 rounded-md border p-4">
        <div className="flex gap-2">
          <Button
            onClick={handleFetchData}
            disabled={isFetchingData || !currentSlide || !currentSlide.endpoint}
          >
            {isFetchingData ? 'Loading...' : 'Fetch Data'}
          </Button>
          <Button onClick={handleGenerateScript} disabled={isGeneratingScript || !currentSlide}>
            {isGeneratingScript ? 'Generating...' : 'Generate Script'}
          </Button>
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <div className="mt-4 h-[50vh] overflow-auto rounded-md bg-gray-100 p-2 dark:bg-gray-800">
          {fetchedData && (
            <pre className="text-sm wrap-break-word whitespace-pre-wrap">
              {JSON.stringify(fetchedData, null, 2)}
            </pre>
          )}
        </div>
      </div>
      <Textarea
        placeholder="Type your Transcript here."
        value={currentSlide?.script}
        onChange={(e) => {
          setCurrentSlide((prev) => (prev ? { ...prev, script: e.target.value } : prev))
        }}
        className="h-full"
      />
      <div className="dark:bg-secondary/30 rounded-md border p-4">
        <Button className="cursor-pointer rounded-full p-0" size="icon">
          <Play />
        </Button>
      </div>
    </div>
  )
}
