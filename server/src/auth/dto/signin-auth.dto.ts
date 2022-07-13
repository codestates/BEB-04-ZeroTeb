export class SignInReqDto {
  readonly request_key: string;
}

export class SignInResDto {
  status: string;
  message: string;
  address?: string;
  username?: string;

  setStatus(status: string) {
    this.status = status;
  }
  setMessage(message: string) {
    this.message = message;
  }
  setAddress(address: string) {
    this.address = address;
  }
  setUsername(username: string) {
    this.username = username;
  }
}
