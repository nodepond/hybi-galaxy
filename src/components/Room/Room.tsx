import React from 'react';
import styled from 'styled-components';
import { panOptions } from '../PanWrapper/panOptions';
import backgroundImage from '../../assets/blank-6000.png';
import { ReactComponent as BackgroundSvg } from '../../assets/foyer-collide-background-6000.svg';

import JitsiStageVideoStream from '../VideoStream/JitsiStageVideoStream'
import Whiteboard from '../StageElements/Whiteboard'

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
  opacity:1;
  width:100%;
  height:100%;
  pointer-events: none;
`

const LiveStream = styled.div`
  background-color: #000;
  position: absolute;
  width: 1813px;
  height: 1130px;
  left: 3755px;
  top: 2560px;
`
const LiveStreamView = styled.div`
  background-color: none;
  opacity: 0.3;
  position: absolute;
  width: 4013px;
  height: 3130px;
  left: 3270px;
  top: 1960px;
  z-index: -1;
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

const WhiteboardFrame = styled.div`
  background-color: none;
  position: absolute;
  width: 897px;
  height: 577px;
  left: 481px;
  top: 1931px;
`

export const Room:React.FC = ({children}) => {
  return (
    <RoomContainer>
      <Background>
        <BackgroundSvg />
      </Background>
      <>
        {/* <LiveStream>
          <JitsiStageVideoStream />
        </LiveStream> */}
        <LiveStreamView id={"LiveStreamView"} />
        <Foyer id={"FoyerView"} />
        <WhiteboardFrame>
          <Whiteboard />
        </WhiteboardFrame>
      </>
      {children}
    </RoomContainer>
  )
}