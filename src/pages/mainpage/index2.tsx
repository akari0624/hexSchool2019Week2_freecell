import React from 'react'
import {
  DragAndDropContext,
  Droppable,
  Draggable
} from '../../components/utils'

export default function index2() {
  return (
    <DragAndDropContext>
      {onDnDDone => (
        <Droppable droppableId="dropable1" onDnDDone={onDnDDone}>
          
            <Draggable draggableItemId="item123">
              <div>123</div>
            </Draggable>
        </Droppable>
      )}
    </DragAndDropContext>
  )
}
