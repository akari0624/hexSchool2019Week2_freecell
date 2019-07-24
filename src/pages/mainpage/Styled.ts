import styled from 'styled-components'
import { env_asset } from '../../../assets'

export const CardDeckArea = styled.div`
  width: 150px;
  height: 300px;
  border: 1px solid #000000;
`

export const PorkerCard = styled.div`
  width: 100px;
  height: 90px;
  text-align: center;
  margin-left: 10px;
  margin-top: -50px;
`

export const TmpAndFinishDecksAreaWrapper = styled.div`
  display: flex;
`

export const UpperDecksWrapper = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
`

export const DecksWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
`

export const MainTable = styled.main`
  width: 100vw;
  height: 100vh;
  background-image: url(${env_asset.bg_normal});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
`
