import React, { useEffect, useRef, useCallback } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot
} from 'react-beautiful-dnd'
import Styled from 'styled-components'

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
}

export default function CardDeck(props: Props) {

  const renderCards = useCallback(
    (pokerCards: number[]) => (
      provided: DroppableProvided,
      snapshot: DroppableStateSnapshot
    ) => (
      <>
        {pokerCards.map((cardNumber, idx) => {
          const cLength = pokerCards.length
          if (idx !== cLength - 1) {
            return (
              <NotDraggablePorkerCard>{`${cardNumber}`}</NotDraggablePorkerCard>
            )
          }

          return (
            <DraggableWrapper
              ref={provided.innerRef}
              key={`${cardNumber}.${idx}`}
            >
              <Draggable draggableId={`${cardNumber}_${idx}`} index={idx}>
                {(provided, snapshot) => (
                  <PorkerCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {`${cardNumber}`}
                  </PorkerCard>
                )}
              </Draggable>
            </DraggableWrapper>
          )
        })}
        {provided.placeholder}
      </>
    ),
    []
  )
  const { pokerCards, droppableId } = props
  return (
    <Droppable droppableId={droppableId} direction="horizontal">
      {renderCards(pokerCards)}
    </Droppable>
  )
}
