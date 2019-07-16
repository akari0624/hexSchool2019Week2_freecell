import React, { useEffect, useRef, useCallback } from 'react'
import {
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot
} from 'react-beautiful-dnd'
import Styled from 'styled-components'

const DropableRefWrapper = Styled.div`
  width: 100px;
  height: 90px;
  margin-top: -60px;
`

const DraggableWrapper = Styled.div`
  width: 100px;
  height: 90px;
  margin-top: -60px;
`

const PorkerCard = Styled.div`
  width: 100px;
  height: 90px;
  border-top: 1px solid #000000;
  border-left: 1px solid #000000;
  border-right: 1px solid #000000;
  text-align: center;
`

const NotDraggablePorkerCard = Styled.div`
  width: 100px;
  height: 90px;
  border-top: 1px solid #000000;
  border-left: 1px solid #000000;
  border-right: 1px solid #000000;
  text-align: center;
  margin-top: -60px;
`

interface Props {
  pokerCards: number[]
  droppableId: string
  nowDraggingAreaId: string
}


  export default function CardDeck(props: Props) {
    const { pokerCards, droppableId, nowDraggingAreaId } = props
  const renderCards = useCallback(
    (pokerCards: number[], nowDraggingDroppableAreaId, thisDroppableId) => (
      provided: DroppableProvided,
      snapshot: DroppableStateSnapshot
    ) => (
      <DropableRefWrapper ref={provided.innerRef} {...provided.droppableProps}>
        {pokerCards.map((cardNumber, idx) => {
          const cLength = pokerCards.length
          // if (
          //   nowDraggingAreaId !== '' &&
          //   nowDraggingDroppableAreaId !== thisDroppableId
          // ) {
          //   return (
          //     <NotDraggablePorkerCard
          //       key={`${cardNumber}_${idx}`}
          //     >{`${cardNumber}`}</NotDraggablePorkerCard>
          //   )
          // }

          if (idx !== cLength - 1) {
            return (
              <NotDraggablePorkerCard
                key={`${cardNumber}_${idx}`}
              >{`${cardNumber}`}</NotDraggablePorkerCard>
            )
          }

          return (
            <DraggableWrapper
            ref={provided.innerRef}
            key={`${cardNumber}.${idx}`}
          >
              <Draggable
                draggableId={`${cardNumber}`}
                index={idx}
                key={`${cardNumber}_${idx}`}
              >
                {(provided, snapshot) => (
                  <PorkerCard
                    key={`${cardNumber}_${idx}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {`${cardNumber}`}
                    {provided.placeholder}
                  </PorkerCard>
                )}
              </Draggable>
             
            </DraggableWrapper>

          )
        })}
        {provided.placeholder}
      </DropableRefWrapper>
    ),
    []
  )
 
  return (
    <Droppable droppableId={droppableId} direction="horizontal">
      {renderCards(pokerCards, nowDraggingAreaId, droppableId)}
    </Droppable>
  )
}
