import {
  TopLeftTempDekArea,
  TopRightFinishDeckDeck,
  BelowCardDroppableArea,
} from '../../../pages/mainpage/constants'
import { Card } from '../../types'
import { Action } from 'redux-actions'
import { DroppingDeckActionType } from '../../actionTypes/reducers'
import { DnDTransData } from '../../../utils/DnDModule/models'

const getDefaultTmpDecksState = () => {
  const tmpDeckCardData = new Map<TopLeftTempDekArea, Card[]>()

  tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_1, [])

  tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_2, [])

  tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_3, [])

  tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_4, [])
  return tmpDeckCardData
}

const tmpDecksReducer = (
  state = getDefaultTmpDecksState(),
  action: Action<DnDTransData>,
) => {
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

export const getDefaultDroppingDecksState = () => {
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

const droppingDecksReducer = (
  state = getDefaultDroppingDecksState(),
  action: Action<Map<BelowCardDroppableArea, Card[]> | DnDTransData>,
) => {
  const { type: doWhat, payload } = action

  switch (doWhat) {
    case DroppingDeckActionType.INIT_SWAPPED_CARDS:
      return payload as Map<BelowCardDroppableArea, Card[]>
    case DroppingDeckActionType.DND_DROPPING_DECK_CARD:
      return payload as Map<BelowCardDroppableArea, Card[]>
  }

  return state
}

export { droppingDecksReducer, tmpDecksReducer, finishDecksReducer, }
