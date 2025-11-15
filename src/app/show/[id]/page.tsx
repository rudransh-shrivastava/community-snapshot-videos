import { App } from '@/app/_components/App'

export default function Home({ params }: { params: { id: string } }) {
  return <App snapshotId={params.id} />
}
