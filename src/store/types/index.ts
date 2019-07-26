import {
  TopLeftTempDekArea,
  TopRightFinishDeckDeck,
  BelowCardDroppableArea,
} from '../../pages/mainpage/constants'

import { HoldingState } from '../reducers/enhancers/undoable'

export type Card = {
  value: number
  dragId: string
  cardImgSrc: string
}

export interface AppState {
  droppingDecks: HoldingState<Map<BelowCardDroppableArea, Card[]>>
  tmpDecks: HoldingState<Map<TopLeftTempDekArea, Card[]>>
  finishDecks: HoldingState<Map<TopRightFinishDeckDeck, Card[]>>
}