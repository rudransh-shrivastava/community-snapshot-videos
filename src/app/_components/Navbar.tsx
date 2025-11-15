import { Button } from '@/components/ui/button'
import { ArrowLeft, SunIcon, VideoIcon } from 'lucide-react'
import Link from 'next/link'

export function Navbar({
  snapshotId,
  onGenerateVideo,
  isGenerateDisabled,
}: {
  snapshotId: string
  onGenerateVideo: () => void
  isGenerateDisabled: boolean
}) {
  return (
    <div className="col-span-3 flex items-center justify-between border-b px-4">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="rounded-full p-0" asChild>
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
        <span>Community Snapshot {snapshotId}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onGenerateVideo} disabled={isGenerateDisabled}>
          <VideoIcon className="mr-2 h-4 w-4" />
          Generate Video
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="flex items-center justify-center rounded-full p-0"
          onClick={() => {
            const isDark = document.documentElement.classList.toggle('dark')
            localStorage.setItem('theme', isDark ? 'dark' : 'light')
          }}
        >
          <SunIcon />
        </Button>
      </div>
    </div>
  )
}
