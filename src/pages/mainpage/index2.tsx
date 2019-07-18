import React, { useCallback } from 'react'
import {
  DragAndDropContext,
  Droppable,
  Draggable
} from '../../components/utils'

export default function Index2() {
  const onDropDone = useCallback(
    (droppingAreaId: string, draggingItemId: string) => {
      console.log('atLevel', droppingAreaId, draggingItemId)
    },
    []
  )

  return (
    <DragAndDropContext onDropDone={onDropDone}>
      {dndCtxProp => (
        <>
          <Droppable droppableId="dropable1" {...dndCtxProp}>
            <Draggable draggableItemId="item1">
              <div>111</div>
            </Draggable>
          </Droppable>

          <Droppable droppableId="dropable2" {...dndCtxProp}>
            <Draggable draggableItemId="item2">
              <div>222</div>
            </Draggable>
          </Droppable>
        </>
      )}
    </DragAndDropContext>
  )
}
