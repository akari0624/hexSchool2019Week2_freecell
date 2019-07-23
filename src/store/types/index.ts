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
  droppingDecks: Map<string, Card[]>
  tmpDecks: Map<string, Card[]>
  finishDecks: Map<string, Card[]>
}