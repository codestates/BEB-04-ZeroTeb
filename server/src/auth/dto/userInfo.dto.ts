interface TokenType {
  token_id: number;
  token_image_url: string;
}

export class UserInfoDto {
  username: string;
  profile_url: string;
  history: {
    created: number;
    entry: number;
    sale: number;
    // liked: number;
  };
  tokens: TokenType[];

  constructor() {
    this.profile_url = '';
    this.tokens = [];
    this.history = {
      created: 0,
      entry: 0,
      sale: 0,
      // liked: 0,
    };
  }
}
