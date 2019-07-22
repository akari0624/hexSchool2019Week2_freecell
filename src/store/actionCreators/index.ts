import { createAction, Action } from 'redux-actions'
import { DroppingDeckActionType } from '../actionTypes'
import { DnDTransData } from '../../utils/DnDModule/models'

const initSwappedDroppingDecks = createAction(
  DroppingDeckActionType.INIT_SWAPPED_CARDS,
  (payload: number[]) => payload
)

const onDndDroppingDecksCardsDone = createAction(
  DroppingDeckActionType.DND_DROPPING_DECK_CARD,
  (payload: DnDTransData) => payload
)

export { initSwappedDroppingDecks, onDndDroppingDecksCardsDone }
