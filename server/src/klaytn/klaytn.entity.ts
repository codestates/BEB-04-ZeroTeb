export class ContracCreateEventkDto {
  creator: string;
  eventName: string;
  eventType: number;
  eventUri: string;
  classNames: string[];
  classPrices: number[];
  classCounts: number[];
  openTime: number;
  closeTime: number;
  startTime: number;
  endTime: number;
}

export class ContractEventDto {
  name: string;
  eventUri: string;
  creator: string;
  classCount: number;
  prices: ContractEventClassType[];
  openTime: number;
  closeTime: number;
  startTime: number;
  endTime: number;
}

export interface ContractEventClassType {
  class: string;
  price: number;
  count: number;
}

export interface ContractBuyerType {
  id: number;
  address: string;
  tokenId: number;
}
