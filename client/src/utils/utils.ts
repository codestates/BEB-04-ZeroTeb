export const profile_url = (address: string) => {
  if (address === '') return ''
  else {
    return `#${address.slice(2, 8)}`
  }
}

export const firstLetter = (name: string) => {
  if (name === '') return ''
  else {
    return name.slice(0, 1)
  }
}
