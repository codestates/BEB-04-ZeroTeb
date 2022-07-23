export interface EventType {
  _id: string
  event_id: number
  title: string
  promoter: string
  address: string
  location: string
  sub_location: string
  category: string
  type: string
  thumnail: string
  token_image_url: string
  price: { class: string; price: number; count: number }[]
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
  totalSeat: number
  __v: number
}

export interface EnrollType {
  title: string
  promoter: string
  address: string
  location: string
  sub_location: string
  category: string
  type: string
  thumnail: string
  token_image_url: string
  price: { class: string; price: number; count: number }[]
  contents: string
  option: object
  recruit_start_date: number
  recruit_end_date: number
  event_start_date: number
  event_end_date: number
  created_date: number
  modified_date: number
}
