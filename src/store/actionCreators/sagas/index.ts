import { createAction } from 'redux-actions'
import { DroppingDeckActionTypeSAGA } from '../../actionTypes/sagas'
import { DnDTransData } from '../../../utils/DnDModule/models'

const initSwappedDroppingDecks = createAction(
  DroppingDeckActionTypeSAGA.INIT_SWAPPED_CARDS_SAGA,
  (payload: number[]) => payload,
)

const handleDnd = createAction(
  DroppingDeckActionTypeSAGA.HANDLE_DND,
  (payload: DnDTransData) => payload,
)

export { initSwappedDroppingDecks, handleDnd }
