import React, { useCallback } from 'react'
import { DnDModuleConstants } from './constant'
interface Props {
  draggableItemId: string
  belongDroppableId: string
  children: JSX.Element
  index: number
  isDraggable?: boolean
}

export default function Draggable(props: Props) {
  const { draggableItemId, belongDroppableId, index, isDraggable = true } = props
  const onDragStartHandler = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.dataTransfer.setData(DnDModuleConstants.dragItemId, draggableItemId)
      e.dataTransfer.setData(DnDModuleConstants.belongDroppableId, belongDroppableId)
      e.dataTransfer.setData(DnDModuleConstants.draggedItemIndex, String(index))
    },
    [draggableItemId, belongDroppableId, index, isDraggable]
  )
  return (
    <div draggable={isDraggable} onDragStart={onDragStartHandler}>
      {props.children}
    </div>
  )
}
