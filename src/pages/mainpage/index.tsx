import React, { useCallback, useState, ReactNode } from 'react'
import _cloneDeep from 'lodash.clonedeep'
import { DragAndDropContext, Droppable, Draggable } from '../../utils/DnDModule'
import { DnDTransData } from '../../utils/DnDModule/models'
import { DNDCtxProps } from '../../utils/DnDModule/DropAndDragContext'
import { CardDeckArea, PorkerCard, DecksWrapper } from './Styled'
import { CardPic } from '../../../assets'
import {
  getAllCards,
  getPartitalCards,
  isCanPut_BelowDecks,
} from '../../game_logic'
import { BelowCardDroppableArea, TopLeftTempDekArea } from './constants'
import PorkerCardOnTmpDeck from '../../components/tmpDeck'

export type Card = {
  value: number
  dragId: string
  cardImgSrc: string
}

const cardsArr = getAllCards(30)

const cardData = new Map<string, Card[]>()

cardData.set(
  BelowCardDroppableArea.DROPPABLE1,
  getPartitalCards(0, 6, cardsArr).map(cn => ({
    value: cn,
    dragId: '' + cn,
    cardImgSrc: CardPic[cn],
  }))
)
cardData.set(
  BelowCardDroppableArea.DROPPABLE2,
  getPartitalCards(7, 13, cardsArr).map(cn => ({
    value: cn,
    dragId: '' + cn,
    cardImgSrc: CardPic[cn],
  }))
)
cardData.set(
  BelowCardDroppableArea.DROPPABLE3,
  getPartitalCards(14, 20, cardsArr).map(cn => ({
    value: cn,
    dragId: '' + cn,
    cardImgSrc: CardPic[cn],
  }))
)
cardData.set(
  BelowCardDroppableArea.DROPPABLE4,
  getPartitalCards(21, 27, cardsArr).map(cn => ({
    value: cn,
    dragId: '' + cn,
    cardImgSrc: CardPic[cn],
  }))
)
cardData.set(
  BelowCardDroppableArea.DROPPABLE5,
  getPartitalCards(28, 33, cardsArr).map(cn => ({
    value: cn,
    dragId: '' + cn,
    cardImgSrc: CardPic[cn],
  }))
)
cardData.set(
  BelowCardDroppableArea.DROPPABLE6,
  getPartitalCards(34, 39, cardsArr).map(cn => ({
    value: cn,
    dragId: '' + cn,
    cardImgSrc: CardPic[cn],
  }))
)
cardData.set(
  BelowCardDroppableArea.DROPPABLE7,
  getPartitalCards(40, 45, cardsArr).map(cn => ({
    value: cn,
    dragId: '' + cn,
    cardImgSrc: CardPic[cn],
  }))
)
cardData.set(
  BelowCardDroppableArea.DROPPABLE8,
  getPartitalCards(46, 51, cardsArr).map(cn => ({
    value: cn,
    dragId: '' + cn,
    cardImgSrc: CardPic[cn],
  }))
)

const tmpDeckCardData = new Map<string, Card[]>()

tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_1, [])

tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_2, [])

tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_3, [])

tmpDeckCardData.set(TopLeftTempDekArea.TEMP_DECK_4, [])

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

const dragLastCardFromThisDraggable = (
  cardMap: Map<string, Card[]>,
  draggableId: string
) => {
  const cardsOfThisDropable = cardMap.get(draggableId)
  const currLength = cardsOfThisDropable.length
  return cardsOfThisDropable[currLength - 1].value
}

export default function IndexPage() {
  const [cardDecks, setCardDecks] = useState<Map<string, Card[]>>(cardData)

  const onDropDone = useCallback((data: DnDTransData) => {
    const { from, to } = data

    setCardDecks(prevDeck => {
      console.log('topLevel, from:to =', from, to)

      const toCardsId = dragLastCardFromThisDraggable(prevDeck, to)
      if (!isCanPut_BelowDecks(parseInt(from.dragItemId, 10), toCardsId)) {
        return prevDeck
      }

      const newDecks = _cloneDeep(prevDeck)
      const moveData = prevDeck.get(from.fromDroppableId)[from.dragItemIndex]
      newDecks.get(to).push(moveData)
      newDecks.get(from.fromDroppableId).splice(from.dragItemIndex, 1)

      return newDecks
    })
  }, [])

  return (
    <DragAndDropContext onDropDone={onDropDone}>
      {dndCtxProp => (
        <>
          <DecksWrapper>
            {renderTmpDecks(tmpDeckCardData, dndCtxProp)}
          </DecksWrapper>
          <DecksWrapper>{renderDecks(cardDecks, dndCtxProp)}</DecksWrapper>
        </>
      )}
    </DragAndDropContext>
  )
}
