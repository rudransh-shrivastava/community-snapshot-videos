import { Button } from '@/components/ui/button'
import { SunIcon, VideoIcon } from 'lucide-react'

export function Navbar({ onGenerateVideo }: { onGenerateVideo: () => void }) {
  return (
    <div className="col-span-3 flex items-center justify-between border-b px-4">
      <div>OWASP Nest API Hackathon</div>
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={onGenerateVideo}>
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
