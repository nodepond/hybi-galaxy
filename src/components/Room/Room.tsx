import React from 'react';
import styled from 'styled-components';
import { panOptions } from '../PanWrapper/panOptions';
import backgroundImage from '../../assets/blank-6000.png';
// import {ReactComponent as BackgroundSvg} from '../../assets/foyer-background-svg-test.svg';
import {ReactComponent as BackgroundSvg} from '../../assets/foyer-collide-background-6000.svg';

import AmazonIVSVideoStream from '../VideoStream/AmazonIVSVideoStream'
import ReactPlayerVideoStream from '../VideoStream/ReactPlayerVideoStream'
import JitsiStageVideoStream from '../VideoStream/JitsiStageVideoStream'

/* fixed size won't work, because when scale is 1 there will be room to pan; but the plugin won't allow it because scale is 1. 
the fix is to set the size of the react-transform-component and react-transform-element exlusively (see GlobalStyles.tsx) */

const RoomContainer = styled.div`
  position: absolute;
  width:${panOptions.room.size.x}px;height:${panOptions.room.size.y}px;
  box-sizing: border-box;
  display:flex;
`

const Background = styled.div`
  background-image:url(${backgroundImage});
  opacity:0.3;
  width:100%;
  height:100%;
  pointer-events: none;
`

const Divstyles = styled.iframe`
  background-color: #f00;
  position: absolute;
  width: 1600px;
  height: 900px;
  left: 3968px;
  top: 4540px;
`

const LiveStream = styled.div`
  background-color: #f0f;
  position: absolute;
  width: 2030px;
  height: 1275px;
  left: 3456px;
  top: 326px;
`
const Foyer = styled.div`
  background-color: none;
  position: absolute;
  width: 2730px;
  height: 1800px;
  left: 256px;
  top: 2426px;
  z-index: -1;
`

export const Room:React.FC = ({children}) => {
  return (
    <RoomContainer>
      <Background>
        <BackgroundSvg />
      </Background>
      <>
        <LiveStream id={"LiveStreamView"}>
          <JitsiStageVideoStream />
        </LiveStream>
        <Foyer id={"FoyerView"} />
      </>
      {children}
    </RoomContainer>
  )
}