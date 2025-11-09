import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { Slide } from '@/types/slide'
import { Play } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function SideBarScript({
  currentSlide,
  setCurrentSlide,
}: {
  currentSlide: Slide | null
  setCurrentSlide: Dispatch<SetStateAction<Slide | null>>
}) {
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
    </div>
  )
}
