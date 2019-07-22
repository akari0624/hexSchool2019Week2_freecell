import { createAction } from 'redux-actions'
import { DroppingDeckActionType, } from '../../actionTypes/reducers'
import { DnDTransData } from '../../../utils/DnDModule/models'
import { Card } from '../../types'
import { BelowCardDroppableArea, } from '../../../pages/mainpage/constants'

const initSwappedDroppingDecks = createAction(
  DroppingDeckActionType.INIT_SWAPPED_CARDS,
  (payload: Map<BelowCardDroppableArea, Card[]>) => payload,
)

const onDndDroppingDecksCardsDone = createAction(
  DroppingDeckActionType.DND_DROPPING_DECK_CARD,
  (payload: Map<string, Card[]>) => payload,
)

const onDndDroppingToTmpArea = createAction(
  DroppingDeckActionType.DND_TMP_DECK_CARD,
  (payload: DnDTransData) => payload,
)

export {
  initSwappedDroppingDecks,
  onDndDroppingDecksCardsDone,
  onDndDroppingToTmpArea,
}
