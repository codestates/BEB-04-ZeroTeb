export const countSeat = (price: []) => {
  return price.reduce((a, b) => {
    return a.count + b.count
  })
}
