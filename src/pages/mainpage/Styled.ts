import styled from 'styled-components'
import { env_asset, meta } from '../../../assets'

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

export const UppestFunctionalAreaWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-evenly;
`


export const Info_Time_UndoWrapper = styled.div`
  display: flex;
  height: 40px;
`

export const UndoBtnAnchor = styled.a`
  display: block;
  width:  40px;
  height: 40px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(${meta.btn_undo});
  cursor: pointer;
  &:active {
    transform: translateY(7px);
  }
`

export const TimeTextWrapper = styled.div`
  width:  200px;
  height: 21px;
  font-family: 'Press Start 2P', cursive;
  font-weight: 100; 
  font-style: normal;
  font-size: 20px;
  text-align: left;
  color: #FFFFFF;
  line-height: 40px;
`


export const GameLogoArea = styled.div`
  width:  358px;
  height: 62px;
  display: flex;
`

export const KingLogoPic = styled.div`
  width:  47px;
  height: 48px;
  background-image: url(${meta.kingLogo});
  background-size: 100% 100%;
  margin-top: 1px;
  margin-bottom: 13px;
  margin-left: 89px;
`

export const LogoGameNameTextWrapper = styled.div`
  width:  209px;
  height: 26px;
  margin-top: 17px;
  margin-bottom: 5px;
  color: #E7BB00;
  font-family: 'Press Start 2P', cursive;
  font-weight: 100; 
  font-style: normal;
  font-size: 25px;
  text-align: left;
`