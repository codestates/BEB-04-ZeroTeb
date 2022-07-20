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
  recruit_start_date: string
  recruit_end_date: string
  event_start_date: string
  event_end_date: string
  created_date: string
  modified_date: string
  x: number
  y: number
  status: string
  remaining: number
  banner: boolean
  __v: number
}

export interface EventEnroll {
  title: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  place: string
  content: string
  token_url: string
  concert_type: string
}
