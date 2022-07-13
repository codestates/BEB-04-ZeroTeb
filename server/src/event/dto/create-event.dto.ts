export class CreateEventDto {
  event_id: number;
  title: string;
  address: string;
  location: string;
  category: string;
  type: string;
  thumnail: string;
  token_image_url: string;
  price: [];
  contents: string;
  option: [];
  recruit_start_date: string;
  recruit_end_date: string;
  event_start_date: string;
  event_end_date: string;
  created_date: string;
  modified_date: string;
}
