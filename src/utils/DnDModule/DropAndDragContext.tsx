import React, { useCallback } from 'react'
import { DnDTransData } from './models'

interface Props {
  children: (propObj: DNDCtxProps) => JSX.Element
  onDropDone: (data: DnDTransData) => void
}

export interface DNDCtxProps {
  onDropDoneCB: (data: DnDTransData) => void
}

export default function DropAndDragContext(props: Props) {
  const { onDropDone } = props
  // callback
  const onDropDoneCB = useCallback(
    (data: DnDTransData) => {
      onDropDone(data)
    },
    [onDropDone]
  )

  const dndCtxPropObj: DNDCtxProps = {onDropDoneCB}

  return <div>{props.children(dndCtxPropObj)}</div>
}
