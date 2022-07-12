export class CreateEventDto {
  title: string;
  address: string;
  location: string;
  category: string;
  type: string;
  thumnail: string;
  token_image_url: string;
  price: [];
  // price: [
  //   {
  //     class: string;
  //     price: number;
  //     count: number;
  //   },
  //   {
  //     class: string;
  //     price: number;
  //     count: number;
  //   },
  // ];
  contents: string;
  option: [];
  recruit_start_date: string;
  recruit_end_date: string;
  event_start_date: string;
  event_end_date: string;
  created_date: string;
  modified_date: string;
}
