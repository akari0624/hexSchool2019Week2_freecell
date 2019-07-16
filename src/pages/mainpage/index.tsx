import React, { useCallback, useState } from 'react'
import Styled from 'styled-components'
import {
  DragDropContext,
  DropResult,
  DragStart,
  ResponderProvided
} from 'react-beautiful-dnd'
import CardDeck from './containers/CardDeck'
import GreenTable from '../../../assets/green_felt.jpg'

const MainTable = Styled.main`
  width: 100vw;
  height: 100vh;
  background-image: url(${GreenTable});
  overflow: hidden;
  display: flex;
`

interface DeckProps {
  marginLeft: string
  marginTop: string
}

const CardDeckWrapper = Styled.section<DeckProps>`
  margin-left:${props => props.marginLeft};
  margin-top:${props => props.marginTop};
`

interface Props {}

type DragStartFuncType = (
  initial: DragStart,
  provided: ResponderProvided
) => void

type Cards = {
  dropArea1: number[]
  dropArea2: number[]
}

const defaultCardState = {
  dropArea1: [1, 2, 3, 4, 5, 6, 7, 8],
  dropArea2: [9, 10, 11, 12, 13]
}

export default (props: Props) => {
  const [nowDraggingDroppableId, setNowDraggingDroppableId] = useState('')
  const [cards, setCards] = useState<Cards>(defaultCardState)
  const onDragEnd = useCallback(
    (result: DropResult) => {
      console.log(result)

      if (!result.destination) {
        return
      }

      result.destination.droppableId
      const source = cards[`${result.source.droppableId}`]
      const newSource = source.slice(0, source.length - 1) //少一張

      const moveTo = cards[`${result.draggableId}`]
      const newMoveTo = [...moveTo, result.draggableId]

      const newCards = {}
      newCards[`${result.source.droppableId}`] = newSource
      newCards[`${result.draggableId}`] = newMoveTo

      setCards(() => newCards as Cards)
      setNowDraggingDroppableId(() => '')
    },

    [cards]
  )

  const onDragStart = useCallback<DragStartFuncType>(
    initial => {
      const nowDraggingDropAreaId = initial.source.droppableId
      setNowDraggingDroppableId(() => nowDraggingDropAreaId)
    },
    [setNowDraggingDroppableId]
  )
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <MainTable>
        <CardDeckWrapper marginLeft="300px" marginTop="300px">
          <CardDeck
            pokerCards={cards.dropArea1}
            droppableId="dropArea1"
            nowDraggingAreaId={nowDraggingDroppableId}
          />
        </CardDeckWrapper>

        <CardDeckWrapper marginLeft="600px" marginTop="300px">
          <CardDeck
            pokerCards={cards.dropArea2}
            droppableId="dropArea2"
            nowDraggingAreaId={nowDraggingDroppableId}
          />
        </CardDeckWrapper>
      </MainTable>
    </DragDropContext>
  )
}
