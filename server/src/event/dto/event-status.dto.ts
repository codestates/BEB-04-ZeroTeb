export type StatusType =
  | 'created' // 이벤트 생성 완료
  | 'minting' // 이벤트 토큰 생성 중
  | 'minted' // 이벤트 토큰 생성 완료
  | 'selling' // 토큰 판매 중
  | 'applying' // 토큰 응모 중
  | 'preparing' // 이벤트 준비 중
  | 'progressing' // 이벤트 진행 중
  | 'end'; // 이벤트 종료

export class EventStatusDto {
  event_id: number;
  status: StatusType;

  constructor() {
    this.status = 'created';
  }

  setEventId(eventId: number) {
    this.event_id = eventId;
  }

  setStatus(status: StatusType) {
    this.status = status;
  }
}
