import React, { useCallback } from 'react'
import { DnDModuleConstants } from './constant'
interface Props {
  draggableItemId: string
  belongDroppableId: string
  children: JSX.Element
}

export default function Draggable(props: Props) {
  const { draggableItemId, belongDroppableId } = props
  const onDragStartHandler = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.dataTransfer.setData(DnDModuleConstants.dragItemId, draggableItemId)
      e.dataTransfer.setData(DnDModuleConstants.belongDroppableId, belongDroppableId)
    },
    [draggableItemId]
  )
  return (
    <div draggable={true} onDragStart={onDragStartHandler}>
      {props.children}
    </div>
  )
}
