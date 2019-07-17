import React, { useCallback } from 'react'
import Styled from 'styled-components'
import {
  DragDropContext,
  DropResult,
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

type DeckProps = {
  marginLeft: string
  marginTop: string
}

const CardDockWrapper = Styled.section<DeckProps>`
  margin-left:${props => props.marginLeft};
  margin-top:${props => props.marginTop};
`

interface Props {}

type OnDragEndCB = (result: DropResult, provided: ResponderProvided) => void

export default (props: Props) => {
  const onDragAndDropEnd = useCallback<OnDragEndCB>(result => {
    console.log(result)
  }, [])
  return (
    <DragDropContext onDragEnd={onDragAndDropEnd}>
      <MainTable>
        <CardDockWrapper marginLeft="300px" marginTop="300px">
          <CardDeck pokerCards={[1, 2, 3, 4, 5]} droppableId="area1" />
        </CardDockWrapper>
        <CardDockWrapper marginLeft="600px" marginTop="300px">
          <CardDeck pokerCards={[6, 7, 8, 9, 10]} droppableId="area2" />
        </CardDockWrapper>
      </MainTable>
    </DragDropContext>
  )
}
