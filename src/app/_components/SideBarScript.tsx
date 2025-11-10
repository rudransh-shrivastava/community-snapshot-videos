import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { Slide } from '@/types/slide'
import { Play } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

export function SideBarScript({
  currentSlide,
  setCurrentSlide,
  fetchedData,
  setFetchedData,
}: {
  currentSlide: Slide | null
  setCurrentSlide: Dispatch<SetStateAction<Slide | null>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedData: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFetchedData: Dispatch<any>
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetchData = async () => {
    if (!currentSlide || !currentSlide.endpoint) {
      setError('No endpoint configured for the current slide.')
      return
    }

    setIsLoading(true)
    setError(null)
    setFetchedData(null)

    const url = `${process.env.NEXT_PUBLIC_OWASP_NEST_API_URL}${currentSlide.endpoint}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`)
      }
      const data = await response.json()
      setFetchedData(data)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-2">
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
      <div className="dark:bg-secondary/30 rounded-md border p-4">
        <Button
          onClick={handleFetchData}
          disabled={isLoading || !currentSlide || !currentSlide.endpoint}
        >
          {isLoading ? 'Loading...' : 'Fetch Data'}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
        {fetchedData && (
          <pre className="mt-4 whitespace-pre-wrap">{JSON.stringify(fetchedData, null, 2)}</pre>
        )}
      </div>
    </div>
  )
}
