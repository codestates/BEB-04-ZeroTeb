export interface EventType {
  _id: string
  event_id: number
  title: string
  promoter: string
  address: string
  location: string
  category: string
  type: string
  thumnail: string
  token_image_url: string
  price: []
  contents: string
  option: []
  recruit_start_date: number
  recruit_end_date: number
  event_start_date: number
  event_end_date: number
  created_date: number
  modified_date: number
  x: number
  y: number
  status: string
  remaining: number
  banner: boolean
  __v: number
}

export interface EventEnroll {
  title: string
  type: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  place: string
  content: string
  token_url: string
  concert_type: string
}
