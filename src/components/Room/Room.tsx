import React from 'react';
import styled from 'styled-components';
import { panOptions } from '../PanWrapper/panOptions';
import backgroundImage from '../../assets/foyer-0.0.1.png';

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

export const Room:React.FC = ({children}) => {
  return (
    <RoomContainer>
      <Background />
      {children}
    </RoomContainer>
  )
}