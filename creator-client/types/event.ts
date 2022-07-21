interface CreateEventType {
  title: string;
  address: string;
  promoter: string;
  location: string;
  category: string;
  type: 'entry' | 'sale';
  thumnail: string;
  token_image_url: string;
  price: EventClassType[];
  contents: string;
  option: object[];
  recruit_start_date: number;
  recruit_end_date: number;
  event_start_date: number;
  event_end_date: number;
  created_date: number;
  modified_date: number;
}

interface EventClassType {
  class: string;
  price: number;
  count: number;
}

export type { CreateEventType, EventClassType };
