import { PaginatedResponse } from '@/types/api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function enrichItems<T extends { [key: string]: any }>(
  items: T[],
  detailEndpointPattern: string
): Promise<T[]> {
  const enrichedItems = await Promise.all(
    items.map(async (item) => {
      const detailEndpoint = detailEndpointPattern.replace(/\{(\w+)\}/g, (_, key) => {
        return item[key] || ''
      })

      if (!detailEndpoint || detailEndpoint === detailEndpointPattern) {
        console.warn('Could not create detail endpoint for item:', item)
        return item
      }

      try {
        const response = await fetch(detailEndpoint)
        if (!response.ok) {
          // Don't throw, just return the original item
          console.error(
            `Failed to fetch details from ${detailEndpoint}. Status: ${response.status}`
          )
          return item
        }
        const details = await response.json()
        return { ...item, ...details }
      } catch (error) {
        console.error(`Error fetching details from ${detailEndpoint}:`, error)
        return item
      }
    })
  )

  return enrichedItems
}

export async function fetchAllPages<T>(endpoint: string): Promise<T[]> {
  let allItems: T[] = []
  let page = 1
  let hasNext = true

  while (hasNext) {
    try {
      const response = await fetch(`${endpoint}?page=${page}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: PaginatedResponse<T> = await response.json()
      allItems = allItems.concat(data.items)
      hasNext = data.has_next
      page++
    } catch (error) {
      console.error(`Failed to fetch page ${page} from ${endpoint}:`, error)
      // Stop fetching if one page fails
      hasNext = false
    }
  }

  return allItems
}
