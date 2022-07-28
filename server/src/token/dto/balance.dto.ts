export class BalanceDto {
  address: string;
  balance: number;

  constructor() {
    this.balance = 0;
  }

  setAddress(address: string) {
    this.address = address;
  }
  setBalance(balance: number) {
    this.balance = balance;
  }
}
