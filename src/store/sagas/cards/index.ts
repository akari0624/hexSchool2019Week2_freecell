import { all, put, take, select } from 'redux-saga/effects'
import { DroppingDeckActionTypeSAGA } from '../../actionTypes/sagas'
import { Action } from 'redux-actions'
import _cloneDeep from 'lodash.clonedeep'
import swal from 'sweetalert2'
import {
  initSwappedDroppingDecks,
  onDndDroppingDecksCardsDone,
  onCardCanBeMovedToTmpArea,
  onCardCanNotBeMoveToTmpArea,
  onCardCanBeMovedToFinishedArea,
  onCardCanBeMovedFromTmpDeckToFinishedArea,
  onTmpDecksNeedToUpdate,
} from '../../actionCreators/reducers'
import {
  getPartitalCards,
  isCanPut_BelowDecks,
  isCanPutToThisFinishDeck,
} from '../../../game_logic'
import { getDefaultDroppingDecksState } from '../../reducers/cards'
import {
  TopLeftTempDekArea,
  TopRightFinishDeckDeck,
  BelowCardDroppableArea,
} from '../../../pages/mainpage/constants'
import { CardPic } from '../../../../assets'
import { DnDTransData, DragSource } from '../../../utils/DnDModule/models'
import { Card, AppState } from '../../types'
import _isEqual from 'lodash.isequal'

const setUpInitDroppingDecksCards = (cardsNumberArr: number[]) => {
  const cardData = getDefaultDroppingDecksState()
  cardData.set(
    BelowCardDroppableArea.DROPPABLE1,
    getPartitalCards(0, 6, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    })),
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE2,
    getPartitalCards(7, 13, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    })),
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE3,
    getPartitalCards(14, 20, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    })),
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE4,
    getPartitalCards(21, 27, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    })),
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE5,
    getPartitalCards(28, 33, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    })),
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE6,
    getPartitalCards(34, 39, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    })),
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE7,
    getPartitalCards(40, 45, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    })),
  )
  cardData.set(
    BelowCardDroppableArea.DROPPABLE8,
    getPartitalCards(46, 51, cardsNumberArr).map(cn => ({
      value: cn,
      dragId: '' + cn,
      cardImgSrc: CardPic[cn],
    })),
  )

  return cardData
}

const dragLastCardFromThisDraggable = (
  cardMap: Map<string, Card[]>,
  draggableId: string,
) => {
  const cardsOfThisDropable = cardMap.get(draggableId)
  const currLength = cardsOfThisDropable.length

  if(currLength === 0) {return -1}
  return cardsOfThisDropable[currLength - 1].value
}

const handleTmpDecksCardsUpdate = (
  prevTmpDeck: Map<string, Card[]>,
  from: DragSource,
) => {
  const newDecks = _cloneDeep(prevTmpDeck)

  newDecks.get(from.fromDroppableId).splice(from.dragItemIndex, 1)

  return newDecks
}

const dndDoneOnDroppingDeckArea = (
  toDecks: Map<string, Card[]>,
  dndData: DnDTransData,
  fromDecks: Map<string, Card[]>
) => {
  const { from, to } = dndData
  const toCardsId = dragLastCardFromThisDraggable(toDecks, to)
  if (toCardsId !== -1 && !isCanPut_BelowDecks(parseInt(from.dragItemId, 10), toCardsId)) {
    return toDecks
  }

  const newToDecks = _cloneDeep(toDecks)
  const moveData = fromDecks.get(from.fromDroppableId)[from.dragItemIndex]
  newToDecks.get(to).push(moveData)
  if(toDecks === fromDecks){
    newToDecks.get(from.fromDroppableId).splice(from.dragItemIndex, 1)
  }
  return newToDecks
}

function* initDroppingDecksFlow() {
  while (true) {
    const action: Action<number[]> = yield take(
      DroppingDeckActionTypeSAGA.INIT_SWAPPED_CARDS_SAGA,
    )
    const { payload } = action
    const cardMap = setUpInitDroppingDecksCards(payload)

    yield put(initSwappedDroppingDecks(cardMap))
  }
}

function* onDropCompleteHandleDndFlow() {
  while (true) {
    try {
      const action: Action<DnDTransData> = yield take(
        DroppingDeckActionTypeSAGA.HANDLE_DND,
      )

      const { payload } = action

      console.log('dnd drop completeData', payload)
      const toWhichDroppable = payload.to
      const droppingDecks: Map<string, Card[]> = yield select(
        (state: AppState) => state.droppingDecks,
      )
      // 從下牌區 拖放 到 下牌區
      if (
        Object.values(BelowCardDroppableArea).includes(
          payload.from.fromDroppableId,
        ) &&
        Object.values(BelowCardDroppableArea).includes(toWhichDroppable)
      ) {
        const newDroppingAreaCards = dndDoneOnDroppingDeckArea(
          droppingDecks,
          payload,
          droppingDecks,
        )
        yield put(onDndDroppingDecksCardsDone(newDroppingAreaCards))
      }

      // 從tmp區 拖放 到 下牌區
      if (
        Object.values(TopLeftTempDekArea).includes(
          payload.from.fromDroppableId,
        ) &&
        Object.values(BelowCardDroppableArea).includes(toWhichDroppable)
      ) {
        const tmpDecks: Map<string, Card[]> = yield select(
          (state: AppState) => state.tmpDecks,
        )

        const newDroppingAreaCards = dndDoneOnDroppingDeckArea(
          droppingDecks,
          payload,
          tmpDecks,
        )
        // 不一樣的話 代表從tmp拉下來的那張牌可以放到下牌區，那tmp區的那張牌就要去除
        if (!_isEqual(newDroppingAreaCards, droppingDecks)) {
          const newTmpDecks = handleTmpDecksCardsUpdate(tmpDecks, payload.from)
          yield put(onTmpDecksNeedToUpdate(newTmpDecks))
        }

        yield put(onDndDroppingDecksCardsDone(newDroppingAreaCards))
      }

      if (Object.values(TopLeftTempDekArea).includes(toWhichDroppable)) {
        const tmpDecks: Map<string, Card[]> = yield select(
          (state: AppState) => state.tmpDecks,
        )
        const tmpDeckCards = tmpDecks.get(toWhichDroppable)
        if (tmpDeckCards.length === 0) {
          const { fromDroppableId, dragItemIndex } = payload.from

          const newDroppingDecks = _cloneDeep(droppingDecks)
          const newTmpDecks = _cloneDeep(tmpDecks)
          const moveToTmpCard = droppingDecks.get(fromDroppableId)[
            dragItemIndex
          ]
          newTmpDecks.get(toWhichDroppable).push(moveToTmpCard)
          newDroppingDecks.get(fromDroppableId).splice(dragItemIndex, 1)

          yield put(onDndDroppingDecksCardsDone(newDroppingDecks))
          yield put(onCardCanBeMovedToTmpArea(newTmpDecks))
        } else {
          yield put(onCardCanNotBeMoveToTmpArea())
        }
      }

      if (Object.values(TopRightFinishDeckDeck).includes(toWhichDroppable)) {
        const finishDecks: Map<string, Card[]> = yield select(
          (state: AppState) => state.finishDecks,
        )
        const finishingDeckCards = finishDecks.get(toWhichDroppable)
        const { fromDroppableId, dragItemIndex, dragItemId } = payload.from
        if (
          isCanPutToThisFinishDeck(
            parseInt(dragItemId, 10),
            toWhichDroppable,
            finishingDeckCards,
          )
        ) {
          const newFinishingDecks = _cloneDeep(finishDecks)

          if (Object.values(BelowCardDroppableArea).includes(fromDroppableId)) {
            const newDroppingDecks = _cloneDeep(droppingDecks)
            newDroppingDecks.get(fromDroppableId).splice(dragItemIndex, 1)

            const moveToFinishingCard = droppingDecks.get(fromDroppableId)[
              dragItemIndex
            ]
            newFinishingDecks.get(toWhichDroppable).push(moveToFinishingCard)

            yield put(onDndDroppingDecksCardsDone(newDroppingDecks))
          } else if (
            Object.values(TopLeftTempDekArea).includes(fromDroppableId)
          ) {
            const tmpDecks: Map<string, Card[]> = yield select(
              (state: AppState) => state.tmpDecks,
            )
            const newTmpDecks = _cloneDeep(tmpDecks)
            newTmpDecks.get(fromDroppableId).splice(dragItemIndex, 1)

            const moveToFinishingCard = tmpDecks.get(fromDroppableId)[
              dragItemIndex
            ]
            newFinishingDecks.get(toWhichDroppable).push(moveToFinishingCard)

            yield put(onCardCanBeMovedFromTmpDeckToFinishedArea(newTmpDecks))
          }

          yield put(onCardCanBeMovedToFinishedArea(newFinishingDecks))
        }
      }
    } catch (err) {
      console.log(err)

      swal.fire({
        title: '發生錯誤',
        text: err,
        type: 'error',
      })
    }
  }
}

export default function* cardsRootSaga() {
  yield all([initDroppingDecksFlow(), onDropCompleteHandleDndFlow()])
}
