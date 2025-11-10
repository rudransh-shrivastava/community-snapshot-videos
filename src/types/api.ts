export interface PaginatedResponse<T> {
  current_page: number
  has_next: boolean
  has_previous: boolean
  items: T[]
  total_count: number
  total_pages: number
}

export interface Project {
  created_at: string
  key: string
  level: string
  name: string
  updated_at: string
}

export interface Sponsor {
  image_url: string
  key: string
  name: string
  sponsor_type: string
  url: string
}
