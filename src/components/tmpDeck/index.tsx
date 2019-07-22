import React from 'react'
import { Droppable, Draggable } from '../../utils/DnDModule'
import { DNDCtxProps } from '../../utils/DnDModule/DropAndDragContext'
import { CardDeckArea, PorkerCardOnTmpDeck } from './Styled'
import { Card } from '../../pages/mainpage'

interface Props {
  deckKey: string
  dndCtxProp: DNDCtxProps
  holdCards: Card[]
}

export default function TempDeck(props: Props) {
  const {deckKey, dndCtxProp, holdCards} = props
  return (
     <Droppable key={deckKey} droppableId={deckKey} {...dndCtxProp}>
        {propsFromDroppable => (
          <CardDeckArea {...propsFromDroppable}>
            {holdCards.map((card, idx) => (
              <Draggable
                key={card.dragId}
                draggableItemId={card.dragId}
                belongDroppableId={deckKey}
                index={idx}
                isDraggable={idx === holdCards.length - 1 ? true : false}
              >
                <PorkerCardOnTmpDeck>
                  <img
                    draggable={idx === holdCards.length - 1 ? true : false}
                    src={card.cardImgSrc}
                  />
                </PorkerCardOnTmpDeck>
              </Draggable>
            ))}
          </CardDeckArea>
        )}
      </Droppable>
  )
}
