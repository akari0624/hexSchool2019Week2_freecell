import React, { useCallback, ReactNode } from 'react'
import { DNDCtxProps } from './DropAndDragContext'
import { DnDModuleConstants } from './constant'

type DroppablePropsToChidrenWrapperType = {
  onDrop: (evt: React.DragEvent<HTMLElement>) => void
  onDragOver: (e: React.DragEvent<HTMLElement>) => void
}

interface DroppableProps {
  droppableId: string
  children: (propsForChildren: DroppablePropsToChidrenWrapperType) => JSX.Element | ReactNode | React.FunctionComponentElement<any>[]
}

type DroppablePropsMerged = DNDCtxProps & DroppableProps

const Droppable: React.FC<DroppablePropsMerged> = props => {
  const { droppableId, onDropDoneCB } = props

  const dropHandler = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      const draggedId = e.dataTransfer.getData(DnDModuleConstants.dragItemId)
      const fromWhichDroppable = e.dataTransfer.getData(
        DnDModuleConstants.belongDroppableId
      )
      const dragItemIndex = e.dataTransfer.getData(
        DnDModuleConstants.draggedItemIndex
      )
      onDropDoneCB({
        from: {
          fromDroppableId: fromWhichDroppable,
          dragItemId: draggedId,
          dragItemIndex: parseInt(dragItemIndex, 10)
        },
        to: droppableId,
      })
    },
    [droppableId, onDropDoneCB]
  )

  const dragOverHandler = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
  }, [])

  const DroppablePropsToChidrenWrapper = {
    onDrop: dropHandler,
    onDragOver: dragOverHandler,
  }

  return <>{props.children(DroppablePropsToChidrenWrapper)}</>
}

export { Droppable as default }
