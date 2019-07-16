import React from 'react'
import Styled from 'styled-components'
import CardDeck from './containers/CardDeck'
import GreenTable from '../../../assets/green_felt.jpg'

const MainTable = Styled.main`
  width: 100vw;
  height: 100vh;
  background-image: url(${GreenTable});
  overflow: hidden;
`

type DeckProps = {
  marginLeft: string
  marginTop: string
}

const CardDockWrapper = Styled.section<DeckProps>`
  margin-left:${(props) => (props.marginLeft)};
  margin-top:${(props) => (props.marginTop)};
`


interface Props {}

export default (props: Props) => (
  <MainTable>
    <CardDockWrapper marginLeft="300px" marginTop="500px">
      <CardDeck />
    </CardDockWrapper>

  </MainTable>
)
