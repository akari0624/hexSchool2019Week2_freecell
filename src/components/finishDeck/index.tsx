import React from 'react'
import { Droppable, Draggable } from '../../utils/DnDModule'
import { DNDCtxProps } from '../../utils/DnDModule/DropAndDragContext'
import { CardDeckArea, PorkerCardOnFinishDeck } from './Styled'
import { Card } from '../../store/types'
import { PorkerKind } from '../../constant'

interface Props {
  deckKey: string
  dndCtxProp: DNDCtxProps
  kind: PorkerKind
  holdCards: Card[]
}

export default function FinishDeck(props: Props) {
  const { deckKey, dndCtxProp, holdCards, kind } = props
  return (
    <Droppable key={deckKey} droppableId={deckKey} {...dndCtxProp}>
      {propsFromDroppable => (
        <CardDeckArea {...propsFromDroppable} kind={kind}>
          {holdCards.map((card, idx) => (
            <Draggable
              key={card.dragId}
              draggableItemId={card.dragId}
              belongDroppableId={deckKey}
              index={idx}
              isDraggable={idx === holdCards.length - 1 ? true : false}
            >
              <PorkerCardOnFinishDeck>
                <img
                  draggable={idx === holdCards.length - 1 ? true : false}
                  src={card.cardImgSrc}
                />
              </PorkerCardOnFinishDeck>
            </Draggable>
          ))}
        </CardDeckArea>
      )}
    </Droppable>
  )
}
