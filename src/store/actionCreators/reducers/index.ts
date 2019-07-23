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

const onCardCanBeMovedToTmpArea = createAction(
  DroppingDeckActionType.DND_TMP_DECK_CARD,
  (payload: Map<string, Card[]>) => payload,
)

const onCardCanNotBeMoveToTmpArea = createAction(
  DroppingDeckActionType.DND_TMP_DECK_CARD_CAN_NOT_PUT,
  () => {}
)

const onCardCanBeMovedToFinishedArea = createAction(
  DroppingDeckActionType.DND_FINISHED_DECK_CARD_CAN_PUT,
  (payload: Map<string, Card[]>) => payload,
)

export {
  initSwappedDroppingDecks,
  onDndDroppingDecksCardsDone,
  onCardCanBeMovedToTmpArea,
  onCardCanNotBeMoveToTmpArea,
  onCardCanBeMovedToFinishedArea,
}
