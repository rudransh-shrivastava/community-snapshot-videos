import { App } from '@/app/_components/App'

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = await params
  return <App snapshotId={id} />
}
