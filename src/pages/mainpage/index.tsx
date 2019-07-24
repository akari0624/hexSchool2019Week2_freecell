import React, { useCallback, useEffect, ReactNode } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragAndDropContext, Droppable, Draggable } from '../../utils/DnDModule'
import { DnDTransData } from '../../utils/DnDModule/models'
import { DNDCtxProps } from '../../utils/DnDModule/DropAndDragContext'
import { CardDeckArea, PorkerCard, DecksWrapper, UpperDecksWrapper, TmpAndFinishDecksAreaWrapper, MainTable } from './Styled'
import { getAllCards } from '../../game_logic'
import PorkerCardOnTmpDeck from '../../components/tmpDeck'
import PorkerCardOnFinishDeck from '../../components/finishDeck'
import { Card, AppState } from '../../store/types'
import {
  initSwappedDroppingDecks,
  handleDnd,
} from '../../store/actionCreators/sagas'

const renderTmpDecks = (
  tmpDeckCardData: Map<string, Card[]>,
  dndCtxProp: DNDCtxProps
): ReactNode[] => {
  let elementsArr: ReactNode[] = []
  for (let [deckKey, cards] of tmpDeckCardData.entries()) {
    elementsArr.push(
      <PorkerCardOnTmpDeck
        dndCtxProp={dndCtxProp}
        deckKey={deckKey}
        holdCards={cards}
      />
    )
  }

  return elementsArr
}

const renderFinishDecks = (
  finishDeckCardData: Map<string, Card[]>,
  dndCtxProp: DNDCtxProps
): ReactNode[] => {
  let elementsArr: ReactNode[] = []
  for (let [deckKey, cards] of finishDeckCardData.entries()) {
    elementsArr.push(
      <PorkerCardOnFinishDeck
        dndCtxProp={dndCtxProp}
        deckKey={deckKey}
        holdCards={cards}
      />
    )
  }

  return elementsArr
}

const renderDecks = (
  cardDecks: Map<string, Card[]>,
  dndCtxProp: DNDCtxProps
): ReactNode[] => {
  let elementsArr: ReactNode[] = []
  for (let [deckKey, cards] of cardDecks.entries()) {
    elementsArr.push(
      <Droppable key={deckKey} droppableId={deckKey} {...dndCtxProp}>
        {propsFromDroppable => (
          <CardDeckArea {...propsFromDroppable}>
            {cards.map((card, idx) => (
              <Draggable
                key={card.dragId}
                draggableItemId={card.dragId}
                belongDroppableId={deckKey}
                index={idx}
                isDraggable={idx === cards.length - 1 ? true : false}
              >
                <PorkerCard>
                  <img
                    draggable={idx === cards.length - 1 ? true : false}
                    src={card.cardImgSrc}
                  />
                </PorkerCard>
              </Draggable>
            ))}
          </CardDeckArea>
        )}
      </Droppable>
    )
  }
  return elementsArr
}

export default function IndexPage() {
  const droppingDecks = useSelector<AppState, Map<string, Card[]>>(
    appState => appState.droppingDecks,
  )
  const tmpDecks = useSelector<AppState, Map<string, Card[]>>(
    appState => appState.tmpDecks,
  )
    const finishDecks = useSelector<AppState, Map<string, Card[]>>(
    appState => appState.finishDecks,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const cardsArr = getAllCards(30)
    dispatch(initSwappedDroppingDecks(cardsArr))
  }, [dispatch])

  const onDropDone = useCallback(
    (data: DnDTransData) => {
      dispatch(handleDnd(data))
    },
    [dispatch]
  )

  return (
    <DragAndDropContext onDropDone={onDropDone}>
      {dndCtxProp => (
        <MainTable>
        <TmpAndFinishDecksAreaWrapper>
          <UpperDecksWrapper>{renderTmpDecks(tmpDecks, dndCtxProp)}</UpperDecksWrapper>
          <UpperDecksWrapper>{renderFinishDecks(finishDecks, dndCtxProp)}</UpperDecksWrapper>
        </TmpAndFinishDecksAreaWrapper>  
          <DecksWrapper>{renderDecks(droppingDecks, dndCtxProp)}</DecksWrapper>
        </MainTable>
      )}
    </DragAndDropContext>
  )
}
