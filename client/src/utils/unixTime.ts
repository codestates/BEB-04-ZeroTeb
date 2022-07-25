export const getDate = (uTime: number) => {
  const date: Date = new Date(uTime * 1000)
  const year = date.getFullYear()
  const month = '0' + (date.getMonth() + 1)
  const day = '0' + date.getDate()
  return year + '-' + month.substr(-2) + '-' + day.substr(-2) + ' '
}

export const getDateAndTime = (uTime: number) => {
  const date: Date = new Date(uTime * 1000)
  const year = date.getFullYear()
  const month = '0' + (date.getMonth() + 1)
  const day = '0' + date.getDate()
  const hour = '0' + date.getHours()
  return (
    year +
    '-' +
    month.substr(-2) +
    '-' +
    day.substr(-2) +
    ' ' +
    hour.substr(-2) +
    ':00'
  )
}

export const getTime = (uTime: number) => {
  const date: Date = new Date(uTime * 1000)
  const hour = '' + date.getHours()
  return hour + ' : 00'
}
