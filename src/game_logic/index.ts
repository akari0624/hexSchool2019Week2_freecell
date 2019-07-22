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
/** 兩張牌的數字和如果是 porkerCardQuantity的奇數倍 然後餘數等於那個 商  代表就是可以在下面放牌區 放下去  */
export const isCanPut = (from: number, to: number) => {
  const sum = from + to
  const result = Math.floor(sum / porkerCardQuantity)
  const remind = sum % porkerCardQuantity
  if((result % 2) !== 0 &&  remind === result){
    return true
  }
  return false
}