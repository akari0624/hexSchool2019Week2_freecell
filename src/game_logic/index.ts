// 發牌
const distributeCards = () => {
  const cardNumberArr = Array(52)
    .fill(0)
    .map((e, i) => i)
  return cardNumberArr
}

// 洗牌
const shuffle = (times: number, numberArr: number[]) => {
  const baseNumber = numberArr.length
  let copiedTimes = times
  while (copiedTimes > 0) {
    const newIndex1 = Math.floor(Math.random() * baseNumber)
    const newIndex2 = Math.floor(Math.random() * baseNumber)
    const temp = numberArr[newIndex2]
    numberArr[newIndex2] = numberArr[newIndex1]
    numberArr[newIndex1] = temp
    copiedTimes -= 1
  }

  return numberArr
}

export const getAllCards = (swapTimes: number) => {
  return shuffle(swapTimes, distributeCards())
}

// 拿第幾張牌 到 第幾張牌
export const getPartitalCards = (from: number, to: number, cards: number[]) => {
  return cards.slice(from, to + 1)
}

const porkerCardQuantity = 13
/** to > from 跟 from > to 的時候，判斷規則不同  前者先base on 13 後者先base on 12  */
export const isCanPut_BelowDecks = (from: number, to: number) => {
  if (to > from) {
    const difference = to - from
    const result = Math.floor(difference / porkerCardQuantity)
    const remind = difference % porkerCardQuantity
    if (result % 2 !== 0 && remind === 1) {
      return true
    }
    return false
  }
  // from > to
  const difference = from - to
  if (difference === 12) {
    return true
  }
  const count = Math.floor((difference - 12) / 13)
  const result = count === 2 ? true : false
  return result
}
