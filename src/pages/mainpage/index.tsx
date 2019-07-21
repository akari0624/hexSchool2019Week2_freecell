import React, { useCallback, useState, ReactNode } from 'react'
import _cloneDeep from 'lodash.clonedeep'
import { DragAndDropContext, Droppable, Draggable } from '../../utils/DnDModule'
import { DnDTransData } from '../../utils/DnDModule/models'
import { DNDCtxProps } from '../../utils/DnDModule/DropAndDragContext'
import { CardDeckArea, PorkerCard, DecksWrapper } from './Styled'
import { CardPic } from '../../../assets'
import { getCards } from '../../game_logic'
type Card = {
  value: number
  dragId: string
  cardImgSrc: string
}

const cardsArr = getCards(30)

const cardData = new Map<string, Card[]>()
cardData.set('dropable1', [
  {
    value: cardsArr[0],
    dragId: '' + cardsArr[0],
    cardImgSrc: CardPic[cardsArr[0]],
  },
  {
    value: cardsArr[1],
    dragId: '' + cardsArr[1],
    cardImgSrc: CardPic[cardsArr[1]],
  },
])
cardData.set('dropable2', [
  {
    value: cardsArr[2],
    dragId: '' + cardsArr[2],
    cardImgSrc: CardPic[cardsArr[2]],
  },
])

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
                  <img src={card.cardImgSrc} />
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
  const [cardDecks, setCardDecks] = useState<Map<string, Card[]>>(cardData)

  const onDropDone = useCallback((data: DnDTransData) => {
    const { from, to } = data

    setCardDecks(prevDeck => {
      console.log('topLevel, from:to =', from, to)
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
        <DecksWrapper>{renderDecks(cardDecks, dndCtxProp)}</DecksWrapper>
      )}
    </DragAndDropContext>
  )
}
