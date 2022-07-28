export const profile_url = (address: string) => {
  if (address === '') return ''
  else {
    return `#${address.slice(2, 8)}`
  }
}
