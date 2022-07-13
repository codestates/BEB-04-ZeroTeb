export interface UserType {
  username: string
  profile_url: string
  history: {
    created: number
    entry: number
    sale: number
    liked: number
  }
  tokens: [
    {
      token_id: string
      token_image_url: string
    },
  ]
}
