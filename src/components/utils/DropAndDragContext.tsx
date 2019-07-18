import React, { useCallback } from 'react'

interface Props {
  children: (propObj: DNDCtxProps) => JSX.Element
  onDropDone: (nowDroppedId: string, dragItemId: string) => void
}

export interface DNDCtxProps {
  onDropDoneCB: (nowDroppedId: string, dragItemId: string) => void
}

export default function DropAndDragContext(props: Props) {
  const { onDropDone } = props
  // callback
  const onDropDoneCB = useCallback(
    (nowDroppedId: string, dragItemId: string) => {
      onDropDone(nowDroppedId, dragItemId)
    },
    [onDropDone]
  )

  const dndCtxPropObj: DNDCtxProps = {onDropDoneCB}

  return <div>{props.children(dndCtxPropObj)}</div>
}
