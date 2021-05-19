import React from 'react';
import styled from 'styled-components';
import { panOptions } from '../PanWrapper/panOptions';
import backgroundImage from '../../assets/foyer-0.0.3.jpg';
// import {ReactComponent as BackgroundSvg} from '../../assets/foyer-background-svg-test.svg';
import {ReactComponent as BackgroundSvg} from '../../assets/foyer-collide-background.svg';

/* fixed size won't work, because when scale is 1 there will be room to pan; but the plugin won't allow it because scale is 1. 
the fix is to set the size of the react-transform-component and react-transform-element exlusively (see App.css) */

const RoomContainer = styled.div`
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
  width: 4672px;
  height: 2944px;
  left: 6912px;
  top: 4032px;
`

export const Room:React.FC = ({children}) => {
  return (
    <RoomContainer>
      <Background>
        <BackgroundSvg />
      </Background>
      <>
        <Divstyles src="https://www.youtube.com/embed/ldF_RlOhRf4" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </>
      {children}
    </RoomContainer>
  )
}