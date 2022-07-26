interface CreateEventType {
  title: string;
  address: string;
  promoter: string;
  location: string;
  sub_location: string;
  category: EventCategory;
  type: EventType;
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
  class: number;
  price: number;
  count: number;
}

type EventType = 'entry' | 'sale';
type EventCategory = 'concert' | 'theater' | 'kid' | 'musical' | 'exhibition' | 'leisure sport';

export type { CreateEventType, EventClassType, EventType, EventCategory };
