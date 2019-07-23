import { Card } from '../store/types'
import { TopRightFinishDeckDeck } from '../pages/mainpage/constants'

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

/**  0~12 黑桃Squade, 13~25 紅心Heart, 26~38 梅花Club, 39~51 方塊Diamond */
const fromCardNumberIdToKind = (numId: number): TopRightFinishDeckDeck => {

   if(numId  >= 0 && numId <= 12){
     return TopRightFinishDeckDeck.FINISH_SQUADE
   }
   else if(numId  >= 13 && numId <= 25){
     return TopRightFinishDeckDeck.FINISH_HEART
   }
   else if(numId  >= 26 && numId <= 38){
     return TopRightFinishDeckDeck.FINISH_CLUB
   }
   else if(numId  >= 39 && numId <= 51){
     return TopRightFinishDeckDeck.FINISH_DIAMOND
   }
}

const examineIsOkToPutInThisFinishDeckCard = (cardNumId: number, deckCards: Card[]) => {
  if(deckCards.length === 0 && (cardNumId !== 0 && cardNumId !== 13 && cardNumId !== 26 && cardNumId !== 39)){
    return false
  }
  const currFinishDeckCardQuantity = deckCards.length
  if(currFinishDeckCardQuantity === 0){
    return true
  }
  const currUppestCardNumId = deckCards[currFinishDeckCardQuantity -1].value
  if((currUppestCardNumId + 1) !== cardNumId){
    return false
  }
  return true
}

export const isCanPutToThisFinishDeck = (
  cardNumId: number,
  deckName: string,
  deckCards: Card[],
): boolean => {
  console.log(cardNumId, deckName, deckCards)

  switch (deckName) {
    case TopRightFinishDeckDeck.FINISH_SQUADE:
      if(fromCardNumberIdToKind(cardNumId) !== TopRightFinishDeckDeck.FINISH_SQUADE){
        return false
      }
      return examineIsOkToPutInThisFinishDeckCard(cardNumId, deckCards)

    case TopRightFinishDeckDeck.FINISH_HEART:
      if(fromCardNumberIdToKind(cardNumId) !== TopRightFinishDeckDeck.FINISH_HEART){
        return false
      }
      return examineIsOkToPutInThisFinishDeckCard(cardNumId, deckCards)

    case TopRightFinishDeckDeck.FINISH_CLUB:
      if(fromCardNumberIdToKind(cardNumId) !== TopRightFinishDeckDeck.FINISH_CLUB){
        return false
      }
      return examineIsOkToPutInThisFinishDeckCard(cardNumId, deckCards)

    case TopRightFinishDeckDeck.FINISH_DIAMOND:
      if(fromCardNumberIdToKind(cardNumId) !== TopRightFinishDeckDeck.FINISH_DIAMOND){
        return false
      }
      return examineIsOkToPutInThisFinishDeckCard(cardNumId, deckCards)
  }
  return false
}
