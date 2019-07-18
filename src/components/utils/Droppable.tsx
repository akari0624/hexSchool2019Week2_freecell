import React, { useCallback } from 'react'
import styled from 'styled-components'


const DropWrapper = styled.div`
  width: 300px;
  height: 500px;
  border: 1px solid black;
`

interface DroppableProps {
  droppableId: string
  children: JSX.Element
  onDnDDone: Function
}

const Droppable: React.FC<DroppableProps> = props => {
  const { droppableId, onDnDDone } = props

  const dropHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      console.log('droppableId', droppableId)
      const draggedId = e.dataTransfer.getData('dragItemId')
      console.log('onDrop: try to get draggedId', draggedId)
      onDnDDone(droppableId, draggedId)
    },
    [droppableId]
  )

  const dragOverHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
     
      e.preventDefault()
    },
    []
  )

  return <DropWrapper onDrop={dropHandler} onDragOver={dragOverHandler}>{props.children}</DropWrapper>
}

export { Droppable as default }
