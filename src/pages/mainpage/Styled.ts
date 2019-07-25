import styled from 'styled-components'
import { env_asset } from '../../../assets'

const cardOffsetTopToCollapse = 100

export const CardDeckArea = styled.div`
  width: 110px;
  height: 300px;
`

export const PorkerCard = styled.div`
  width: 110px;
  height: 145px;
  text-align: center;
  margin-top: -${cardOffsetTopToCollapse}px;

  & > img {
    width: 110px;
    height: 145px;
  }
`

export const TmpAndFinishDecksAreaWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 145px;
   & > div {
    margin-right: 24px;
  }

  & > div:first-child {
    margin-left: 85px;
  }
   & > div:nth-child(4) {
    margin-right: 85px;
  }
`

export const UpperDecksWrapper = styled.div`
  width: 50%;
  height: 50%;
  display: flex;

  & > div {
    margin-right: 24px;
  }

  & > div:last-child {
    margin-right: 0px;
  }
`

export const DownSideDroppingDecksWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  margin-top: ${cardOffsetTopToCollapse + 19}px;
  & > div {
    margin-right: 24px;
  }

  & > div:first-child {
    margin-left: 85px;
  }
   & > div:nth-child(4) {
    margin-right: 105px;
  }
`

export const MainTable = styled.main`
  width: 100vw;
  height: 100vh;
  background-image: url(${env_asset.bg_normal});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
`
