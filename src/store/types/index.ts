import {
  TopLeftTempDekArea,
  TopRightFinishDeckDeck,
  BelowCardDroppableArea,
} from '../../pages/mainpage/constants'


export type Card = {
  value: number
  dragId: string
  cardImgSrc: string
}

export interface AppState {
  droppingDecks: Map<BelowCardDroppableArea, Card[]>
  tmpDecks: Map<TopLeftTempDekArea, Card[]>
  finishDecks: Map<TopRightFinishDeckDeck, Card[]>
}