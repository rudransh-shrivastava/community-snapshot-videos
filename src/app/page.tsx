'use client'

import { fetchAllPages } from '@/lib/api'
import { NEST_API_URL } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export interface Snapshot {
  created_at: string
  end_at: string
  key: string
  start_at: string
  title: string
  updated_at: string
}

export default function SnapshotPage() {
  const [data, setData] = useState<Snapshot[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${NEST_API_URL}/api/v0/snapshots`
        const response = await fetchAllPages<Snapshot>(apiUrl)
        setData(response)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-16 text-center">Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <h1 className="py-8 text-center text-4xl font-bold">Snapshots</h1>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {data ? (
          data?.map((snapshot, index) => {
            const options = {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'UTC',
            } as Intl.DateTimeFormatOptions

            const startDate = new Date(snapshot.start_at)
            startDate.setUTCMonth(startDate.getUTCMonth())
            const endDate = new Date(snapshot.start_at)
            endDate.setUTCMonth(endDate.getUTCMonth() + 1)

            const formattedStart = startDate.toLocaleDateString('en-US', options)
            const formattedEnd = endDate.toLocaleDateString('en-US', options)

            return (
              <Link
                key={index}
                className="bg-secondary/25 flex cursor-pointer flex-col items-center gap-2 rounded-md border px-2 py-4"
                href={`/show/${snapshot.key}`}
              >
                <div className="text-center text-xl font-bold">{snapshot.title}</div>
                <div>{`${formattedStart} - ${formattedEnd}`}</div>
                <div className="flex items-center justify-center gap-1">
                  <span>Go to presentation</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            )
          })
        ) : (
          <div>No Snapshots found</div>
        )}
      </div>
    </div>
  )
}
