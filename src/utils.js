import { DISCOUNT_PERCENT, PRICE_WHEN_DISCOUNT } from "./config"

export const addQuantityAndTotal = (obj) => {
  obj.quantity = 0
  obj.totalPrice = 0
}

export const byId = (id) => (product) => product.id === id

export const sumPrice = (price1, price2) => Number((price1 + price2).toFixed(2))

export const discountPrice = (price) => {
  if (price > PRICE_WHEN_DISCOUNT) {
    const discountPrice =
      Math.round((price / 100) * DISCOUNT_PERCENT * 100) / 100
    const newPrice = sumPrice(price, -discountPrice)
    return [newPrice, discountPrice]
  }
  return [price, 0]
}

export const hundredthsFormat = (number) => {
  let str = number.toString()
  const dotIndex = str.indexOf(".")
  if (dotIndex === -1) return str + ".00"
  if (dotIndex === str.length - 2) return str + "0"
  return str
}
