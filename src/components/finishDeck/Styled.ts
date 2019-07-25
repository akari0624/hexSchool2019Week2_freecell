import styled from 'styled-components'
import { finishDeck } from '../../../assets'
import { PorkerKind } from '../../constant'

type CardDeckAreaProps = {
  kind: PorkerKind
}

export const CardDeckArea = styled.div<CardDeckAreaProps>`
  width: 110px;
  height: 145px;
  border: 2px solid #EDEDED;
  border-radius: 10px;
  background-image: url(${props => finishDeck[props.kind]});
  background-repeat: no-repeat;
  background-size: 50% 30%;
  background-position: center center;
`
export const PorkerCardOnFinishDeck = styled.div`
  width: 110px;
  height: 145px;
  text-align: center;
`
