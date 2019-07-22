import {
  TopLeftTempDekArea,
  TopRightFinishDeckDeck,
  BelowCardDroppableArea,
} from '../../../pages/mainpage/constants'
import { Card } from '../../types'
import { Action } from 'redux-actions'
import _cloneDeep from 'lodash.clonedeep'
import { DroppingDeckActionType } from '../../actionTypes'
import { getPartitalCards, isCanPut_BelowDecks } from '../../../game_logic'
import { CardPic } from '../../../../assets'
import { DnDTransData } from '../../../utils/DnDModule/models'

const getDefaultTmpDecksState = () => {
  const tmpDeckCardData = new Map<TopLeftTempDekArea, Card[]>()

  tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_1, [])

  tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_2, [])

  tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_3, [])

  tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_4, [])
  return tmpDeckCardData
}

const tmpDecksReducer = (state = getDefaultTmpDecksState(), action) => {
  return state
}

const getDefaultFinishDecksState = () => {
  const finishDeckCardData = new Map<TopRightFinishDeckDeck, Card[]>()

  finishDeckCardData.set(TopRightFinishDeckDeck.FINISH_SQUADE, [])

  finishDeckCardData.set(TopRightFinishDeckDeck.FINISH_HEART, [])

  finishDeckCardData.set(TopRightFinishDeckDeck.FINISH_CLUB, [])

  finishDeckCardData.set(TopRightFinishDeckDeck.FINISH_DIAMOND, [])
  return finishDeckCardData
}

const finishDecksReducer = (state = getDefaultFinishDecksState(), action) => {
  return state
}

const getDefaultDroppingDecksState = () => {
  const finishDeckCardData = new Map<BelowCardDroppableArea, Card[]>()

  finishDeckCardData.set(BelowCardDroppableArea.DROPPABLE1, [])

  finishDeckCardData.set(BelowCardDroppableArea.DROPPABLE2, [])

  finishDeckCardData.set(BelowCardDroppableArea.DROPPABLE3, [])

  finishDeckCardData.set(BelowCardDroppableArea.DROPPABLE4, [])

  finishDeckCardData.set(BelowCardDroppableArea.DROPPABLE5, [])

  finishDeckCardData.set(BelowCardDroppableArea.DROPPABLE6, [])

  finishDeckCardData.set(BelowCardDroppableArea.DROPPABLE7, [])

  finishDeckCardData.set(BelowCardDroppableArea.DROPPABLE8, [])
  return finishDeckCardData
}

const setUpInitDroppingDecksCards = (cardsNumberArr: number[]) => {
  const cardData = getDefaultDroppingDecksState()
  cardData.set(
    BelowCardDroppableArea.DROPPABLE1,
    getPartitalCards(0, 6, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    }))
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE2,
    getPartitalCards(7, 13, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    }))
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE3,
    getPartitalCards(14, 20, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    }))
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE4,
    getPartitalCards(21, 27, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    }))
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE5,
    getPartitalCards(28, 33, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    }))
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE6,
    getPartitalCards(34, 39, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    }))
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE7,
    getPartitalCards(40, 45, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    }))
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE8,
    getPartitalCards(46, 51, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    }))
  )

  return cardData
}

const dragLastCardFromThisDraggable = (
  cardMap: Map<string, Card[]>,
  draggableId: string
) => {
  const cardsOfThisDropable = cardMap.get(draggableId)
  const currLength = cardsOfThisDropable.length
  return cardsOfThisDropable[currLength - 1].value
}

const dndDoneOnDroppingDeckArea = (
  prevDeck: Map<string, Card[]>,
  dndData: DnDTransData
) => {
  const { from, to } = dndData
  const toCardsId = dragLastCardFromThisDraggable(prevDeck, to)
  if (!isCanPut_BelowDecks(parseInt(from.dragItemId, 10), toCardsId)) {
    return prevDeck
  }

  const newDecks = _cloneDeep(prevDeck)
  const moveData = prevDeck.get(from.fromDroppableId)[from.dragItemIndex]
  newDecks.get(to).push(moveData)
  newDecks.get(from.fromDroppableId).splice(from.dragItemIndex, 1)

  return newDecks
}

const droppingDecksReducer = (
  state = getDefaultDroppingDecksState(),
  action: Action<number[] | DnDTransData>
) => {
  const { type: doWhat, payload } = action

  switch (doWhat) {
    case DroppingDeckActionType.INIT_SWAPPED_CARDS:
      return setUpInitDroppingDecksCards(payload as number[])
    case DroppingDeckActionType.DND_DROPPING_DECK_CARD:
      return dndDoneOnDroppingDeckArea(state, payload as DnDTransData)
  }

  return state
}

export { droppingDecksReducer, tmpDecksReducer, finishDecksReducer }
