import React, { useCallback, useState } from 'react'
import _cloneDeep from 'lodash.clonedeep'
import {
  DragAndDropContext,
  Droppable,
  Draggable
} from '../../utils/DnDModule'
import { DnDTransData } from '../../utils/DnDModule/models'

type Card = {
  value: number
  dragId: string
}

type CardDeck = {
  dropId: string
  cards: Card[]
}

export default function Index2() {
  const [cardDecks, setCardDecks] = useState<CardDeck[]>([
    {
      dropId: 'dropable1',
      cards: [{ value: 111, dragId: 'card1' }, { value: 222, dragId: 'card2' }]
    },
    { dropId: 'dropable2', cards: [{ value: 333, dragId: 'card3' }] }
  ])
  const onDropDone = useCallback((data: DnDTransData) => {
    console.log('atLevel, from:to:dragged =', data.from, data.to, data.dragItemId)
    const newDecks = _cloneDeep(cardDecks)
    newDecks[0][`cards`].push({ value: 333, dragId: 'card3' })
    setCardDecks(newDecks)
  }, [])

  return (
    <DragAndDropContext onDropDone={onDropDone}>
      {dndCtxProp => (
        <>
          {cardDecks.map(deck => (
            <Droppable
              key={deck.dropId}
              droppableId={deck.dropId}
              {...dndCtxProp}
            >
              {deck.cards.map(card => (
                <Draggable key={card.dragId} draggableItemId={card.dragId} belongDroppableId={deck.dropId}>
                  <div>{card.value}</div>
                </Draggable>
              ))}
            </Droppable>
          ))}
        </>
      )}
    </DragAndDropContext>
  )
}
