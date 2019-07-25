import styled from 'styled-components'
import { finishDeck } from '../../../assets'
import { PorkerKind } from '../../constant'

type CardDeckAreaProps = {
  kind: PorkerKind
}

export const CardDeckArea = styled.div<CardDeckAreaProps>`
  width: 150px;
  height: 300px;
  border: 1px solid #000000;
  background-image: url(${props => finishDeck[props.kind]});
  background-repeat: no-repeat;
  background-size: 50% 30%;
  background-position: center center;
`
export const PorkerCardOnFinishDeck = styled.div`
  width: 100px;
  height: 90px;
  text-align: center;
`
