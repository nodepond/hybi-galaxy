import React from 'react'
import { ErrorHandler } from '../../components/common/Info/ErrorHandler'
import { Info } from '../../components/common/Info/Info'
import { Footer } from '../../components/Footer/Footer'
import { JoinButton } from '../../components/Footer/JoinButton/JoinButton'
import { MuteButton } from '../../components/Footer/MuteButton/MuteButton'
import { ToggleStageViewButton } from '../../components/Footer/AdminButtons/ToggleStageViewButton'
import { ToStageButton } from '../../components/Footer/WarpButtons/ToStageButton'
import { ToFoyerButton } from '../../components/Footer/WarpButtons/ToFoyerButton'
import { Spacer } from '../../components/Footer/Spacer'

import { Header } from '../../components/Header/Header'
import JitsiConnection from '../../components/JitsiConnection/JitsiConnection'
import JitsiStageConnection from '../../components/JitsiConnection/JitsiStageConnection'
import { Localuser } from '../../components/Localuser/Localuser'
import { UserDragContainer } from '../../components/Localuser/LocalUserContainer'
import { PanWrapper } from '../../components/PanWrapper/PanWrapper'
import { Room } from '../../components/Room/Room'
import { Users } from '../../components/User/Users'
import { Stages } from '../../components/User/Stages'
import { LocalStoreLogic } from '../../store/LocalStoreLogic'
import { useMediaQuery } from 'react-responsive'

import { useLocalAdminStore } from '../../store/LocalAdminStore';

import JitsiStageVideoStream from '../../components/VideoStream/JitsiStageVideoStream'

import styled from 'styled-components';

const LiveStream = styled.div`
  background-color: #000;
  position: absolute;
  width: 1813px;
  height: 1130px;
  left: 3755px;
  top: 2560px;
`

export const Session = () => {
  const embeddedStageView = useLocalAdminStore(store => store.embeddedStageView)

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  return (
    <React.Fragment>
      <ErrorHandler />
      {!isDesktopOrLaptop && <Info>
        Das Foyer funktionert aktuell nicht auf Mobiltelefon oder Tablet. Bitte benutzen Sie einen Browser auf dem Laptop oder PC.
      </Info>}
      <Header>Hybrid Stage by BoatPeopleProject e.V.</Header>
      <JitsiConnection />
      <JitsiStageConnection />
      <LocalStoreLogic />
      <PanWrapper>
        <Room>
          <Users />
          {embeddedStageView && <Stages />}
          <UserDragContainer>
            <Localuser audioRadius />
          </UserDragContainer>
          {!embeddedStageView && <LiveStream>
            <JitsiStageVideoStream />
          </LiveStream>}
        </Room>
      </PanWrapper>
      <Footer>
        {/* <ToFoyerButton onAccessStreamFullscreen={() => { onAccessStreamFullscreen() }} />
        <ToStageButton />
        <Spacer /> */}
        <MuteButton />
        <Spacer />
        <JoinButton joined />
        <Spacer />
        <ToggleStageViewButton />
      </Footer>
    </React.Fragment>
  )
}
