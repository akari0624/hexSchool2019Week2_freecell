import React, { useCallback } from 'react'


// callback
const onDropDone = (nowDroppedId: string, dragIemId: string) => {

  console.log(nowDroppedId, dragIemId)
}

interface Props {
  children: (cb: Function) => JSX.Element
}

export default function DropAndDragContext(props: Props) {
  return (
    <div>
      {props.children(onDropDone)}
    </div>
  )
}
