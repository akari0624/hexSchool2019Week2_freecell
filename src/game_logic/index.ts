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

export const getCards = (swapTimes: number) => {
  return shuffle(swapTimes, distributeCards())
}
