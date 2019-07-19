import React, { useCallback, ReactNode } from 'react'
import styled from 'styled-components'
import { DNDCtxProps } from './DropAndDragContext'
import {DnDModuleConstants} from './constant'

const DropWrapper = styled.div`
  width: 300px;
  height: 500px;
  border: 1px solid black;
`

interface DroppableProps {
  droppableId: string
  children: JSX.Element | ReactNode
}

type DroppablePropsMerged = DNDCtxProps & DroppableProps

const Droppable: React.FC<DroppablePropsMerged> = props => {
  const { droppableId, onDropDoneCB } = props

  const dropHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      const draggedId = e.dataTransfer.getData(DnDModuleConstants.dragItemId)
      const fromWhichDroppable = e.dataTransfer.getData(DnDModuleConstants.belongDroppableId)
      onDropDoneCB({from: fromWhichDroppable, to: droppableId, dragItemId: draggedId})
    },
    [droppableId]
  )

  const dragOverHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  return (
    <DropWrapper onDrop={dropHandler} onDragOver={dragOverHandler}>
      {props.children}
    </DropWrapper>
  )
}

export { Droppable as default }
