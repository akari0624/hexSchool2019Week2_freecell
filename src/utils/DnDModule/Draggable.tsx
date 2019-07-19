import React, { useCallback } from 'react'
import { DnDModuleConstants } from './constant'
interface Props {
  key: string
  draggableItemId: string
  belongDroppableId: string
  children: JSX.Element
  index: number
  isDraggable?: boolean
}

// the `any` return type is necessary @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27805#issuecomment-508106043 
export default function Draggable(props: Props): any {
  const { draggableItemId, belongDroppableId, index, isDraggable = true, key } = props
  const onDragStartHandler = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.dataTransfer.setData(DnDModuleConstants.dragItemId, draggableItemId)
      e.dataTransfer.setData(DnDModuleConstants.belongDroppableId, belongDroppableId)
      e.dataTransfer.setData(DnDModuleConstants.draggedItemIndex, String(index))
    },
    [draggableItemId, belongDroppableId, index,]
  )

  return React.Children.map(props.children, childVDom =>
    React.cloneElement(childVDom, {
      draggable: isDraggable,
      onDragStart: onDragStartHandler,
      key: key,
    })
  )
}
