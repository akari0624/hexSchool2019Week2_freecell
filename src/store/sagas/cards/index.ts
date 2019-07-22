import { all, put, take, select, } from 'redux-saga/effects'
import { DroppingDeckActionTypeSAGA } from '../../actionTypes/sagas'
import { Action } from 'redux-actions'
import {
  initSwappedDroppingDecks,
  onDndDroppingDecksCardsDone,
  onDndDroppingToTmpArea,
} from '../../actionCreators/reducers'
import { getPartitalCards, isCanPut_BelowDecks, } from '../../../game_logic'
import { getDefaultDroppingDecksState } from '../../reducers/cards'
import {
  TopLeftTempDekArea,
  TopRightFinishDeckDeck,
  BelowCardDroppableArea,
} from '../../../pages/mainpage/constants'
import { CardPic, } from '../../../../assets'
import { DnDTransData, } from '../../../utils/DnDModule/models'

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

function* initDroppingDecksFlow() {
  while (true) {
    const action: Action<number[]> = yield take(
      DroppingDeckActionTypeSAGA.INIT_SWAPPED_CARDS_SAGA
    )
    const { payload } = action
    const cardMap = setUpInitDroppingDecksCards(payload)

    yield put(initSwappedDroppingDecks(cardMap))
  }
}

function* onDropCompleteHandleDndFlow() {
  while (true) {
    const action: Action<DnDTransData> = yield take(
      DroppingDeckActionTypeSAGA.HANDLE_DND
    )

    const { payload } = action

    console.log('dnd drop completeData', payload)
    const toWhichDroppable = payload.to
    if (Object.values(BelowCardDroppableArea).includes(toWhichDroppable)) {
      yield put(onDndDroppingDecksCardsDone(payload))
    }

    if (Object.values(TopLeftTempDekArea).includes(toWhichDroppable)) {
      yield put(onDndDroppingToTmpArea(payload))
    }
  }
}

export default function* cardsRootSaga() {
  yield all([initDroppingDecksFlow(), onDropCompleteHandleDndFlow(), ])
}
