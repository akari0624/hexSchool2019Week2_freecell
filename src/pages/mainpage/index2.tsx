import React, { useCallback, useState, ReactNode } from 'react'
import _cloneDeep from 'lodash.clonedeep'
import { DragAndDropContext, Droppable, Draggable } from '../../utils/DnDModule'
import { DnDTransData } from '../../utils/DnDModule/models'
import { DNDCtxProps } from '../../utils/DnDModule/DropAndDragContext'
import { CardDeckArea, PorkerCard, DecksWrapper } from './Styled'

type Card = {
  value: number
  dragId: string
}

const cardData = new Map<string, Card[]>()
cardData.set('dropable1', [
  { value: 111, dragId: 'card1' },
  { value: 222, dragId: 'card2' }
])
cardData.set('dropable2', [{ value: 333, dragId: 'card3' }])

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
              >
                <PorkerCard>{card.value}</PorkerCard>
              </Draggable>
            ))}
          </CardDeckArea>
        )}
      </Droppable>
    )
  }
  return elementsArr
}

export default function Index2() {
  const [cardDecks, setCardDecks] = useState<Map<string, Card[]>>(cardData)

  const onDropDone = useCallback(
    (data: DnDTransData) => {
      const { from, to } = data

      setCardDecks(prevDeck => {
        console.log('topLevel, from:to =', from, to)
        const newDecks = _cloneDeep(prevDeck)
        const moveData = prevDeck.get(from.fromDroppableId)[from.dragItemIndex]
        newDecks.get(to).push(moveData)
        newDecks.get(from.fromDroppableId).splice(from.dragItemIndex, 1)

        return newDecks
      })
    },
    [cardDecks]
  )

  return (
    <DragAndDropContext onDropDone={onDropDone}>
      {dndCtxProp => (
        <DecksWrapper>{renderDecks(cardDecks, dndCtxProp)}</DecksWrapper>
      )}
    </DragAndDropContext>
  )
}
