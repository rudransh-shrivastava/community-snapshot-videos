import { ProcessingSlide, ProcessingTask } from '@/app/_components/App'
import type { Slide } from '@/types/slide'
import { CheckCircle2, Database, FileText, Loader, Volume2 } from 'lucide-react'

interface StatusIndicatorProps {
  slide: Slide
  processingSlide: ProcessingSlide | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedDataCache: Record<string, any>
  scriptCache: Record<string, string>
  audioUrlCache: Record<string, string | null>
}

type Status = 'pending' | 'done' | 'todo' | 'not-applicable'

export function StatusIndicator({
  slide,
  processingSlide,
  fetchedDataCache,
  scriptCache,
  audioUrlCache,
}: StatusIndicatorProps) {
  const dataStatus: Status = !slide.endpoint
    ? 'not-applicable'
    : processingSlide?.id === slide.id && processingSlide?.task === 'data'
      ? 'pending'
      : fetchedDataCache[slide.id]
        ? 'done'
        : 'todo'

  const scriptStatus: Status = slide.disableScriptGeneration
    ? 'done'
    : processingSlide?.id === slide.id && processingSlide?.task === 'script'
      ? 'pending'
      : scriptCache[slide.id]
        ? 'done'
        : 'todo'

  const scriptExists = scriptCache[slide.id] ?? slide.script

  const audioStatus: Status = !scriptExists
    ? 'not-applicable'
    : processingSlide?.id === slide.id && processingSlide?.task === 'audio'
      ? 'pending'
      : audioUrlCache[slide.id]
        ? 'done'
        : 'todo'

  const isReady =
    (dataStatus === 'done' || dataStatus === 'not-applicable') &&
    scriptStatus === 'done' &&
    (audioStatus === 'done' || audioStatus === 'not-applicable') &&
    !!scriptExists

  const getIcon = (task: ProcessingTask, status: Status) => {
    const icons = {
      data: Database,
      script: FileText,
      audio: Volume2,
    }
    const Icon = icons[task]
    const baseClassName = 'h-4 w-4'

    switch (status) {
      case 'pending':
        return <Loader className={`${baseClassName} animate-spin text-blue-500`} />
      case 'done':
        return <Icon className={`${baseClassName} text-green-500`} />
      case 'todo':
        return <Icon className={`${baseClassName} text-yellow-500`} />
      case 'not-applicable':
        return null
    }
  }

  const getTooltip = (task: ProcessingTask, status: Status) => {
    const taskName = task.charAt(0).toUpperCase() + task.slice(1)
    switch (status) {
      case 'pending':
        return `${taskName} generation is in progress...`
      case 'done':
        return `${taskName} is ready.`
      case 'todo':
        return `${taskName} has not been generated for this slide.`
      case 'not-applicable':
        return `${taskName} is not required for this slide.`
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {[
          { task: 'data', status: dataStatus },
          { task: 'script', status: scriptStatus },
          { task: 'audio', status: audioStatus },
        ].map(({ task, status }) => {
          const icon = getIcon(task as ProcessingTask, status)
          if (!icon) return null
          return (
            <div key={task} title={getTooltip(task as ProcessingTask, status)}>
              {icon}
            </div>
          )
        })}
      </div>
      {isReady && (
        <div title="This slide is ready to be included in the video.">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </div>
      )}
    </div>
  )
}
