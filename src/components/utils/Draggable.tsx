import React, { useCallback } from 'react'

interface Props {
  draggableItemId: string
  children: JSX.Element
}

export default function Draggable(props: Props) {
  const { draggableItemId } = props
  const onDragStartHandler = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.dataTransfer.setData('dragItemId', draggableItemId)
    },
    [draggableItemId]
  )
  return (
    <div draggable={true} onDragStart={onDragStartHandler}>
      {props.children}
    </div>
  )
}
