import { Button } from '@/components/ui/button'
import { SunIcon } from 'lucide-react'

export function Navbar() {
  return (
    <div className="col-span-3 flex items-center justify-between border-b px-4">
      <div>OWASP Nest API Hackathon</div>
      <Button
        variant="secondary"
        size="icon"
        className="flex items-center justify-center rounded-full p-0"
        onClick={() => {
          document.body.classList.toggle('dark')
        }}
      >
        <SunIcon />
      </Button>
    </div>
  )
}
