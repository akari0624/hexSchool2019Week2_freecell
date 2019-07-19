type DragSource = {
  fromDroppableId: string
  dragItemId: string
  dragItemIndex: number
}

export interface DnDTransData {
  from: DragSource  // info of drag from which Droppable
  to: string   //  drop to which Droppable 
}