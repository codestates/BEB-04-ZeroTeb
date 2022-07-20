export interface EventType {
  _id: string
  event_id: number
  title: string
  address: string
  location: string
  category: string
  type: string
  thumnail: string
  token_image_url: string
  price: object
  contents: string
  option: object
  recruit_start_date: number
  recruit_end_date: number
  event_start_date: number
  event_end_date: number
  created_date: number
  modified_date: number
  __v: number
  promoter: string
  remaining: number
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
