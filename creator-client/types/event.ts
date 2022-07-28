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

interface EventInfoType {
  event_id: number;
  title: string;
  promoter: string;
  address: string;
  location: string;
  sub_location: string;
  category: string;
  type: string;
  thumnail: string;
  token_image_url: string;
  price: EventClassType[];
  contents: '2022년한 해 누구보다 숨 가쁘게 달려온 아이유가 데뷔 14주년 기념 콘서트로 여러분을 찾아갑니다.';
  option: [{}];
  recruit_start_date: number;
  recruit_end_date: number;
  event_start_date: number;
  event_end_date: number;
  created_date: number;
  modified_date: number;
  x: number;
  y: number;
  status: EventStatusType;
  remaining: number;
  banner: boolean;
  totalSeat: number;
}

interface EventClassType {
  class: number;
  price: number;
  count: number;
}
type EventType = 'entry' | 'sale';
type TokenType = 'nft' | 'sbt';
type EventCategory = 'concert' | 'theater' | 'kids' | 'musical' | 'exhibition' | 'leisure sport';
type EventStatusType =
  | 'created' // 이벤트 생성 완료
  | 'minting' // 이벤트 토큰 생성 중
  | 'minted' // 이벤트 토큰 생성 완료
  | 'selling' // 토큰 판매 중
  | 'applying' // 토큰 응모 중
  | 'preparing' // 이벤트 준비 중
  | 'progressing' // 이벤트 진행 중
  | 'end'; // 이벤트 종료

export type {
  CreateEventType,
  EventClassType,
  EventType,
  EventCategory,
  TokenType,
  EventInfoType,
  EventStatusType,
};
