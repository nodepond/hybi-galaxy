import React from 'react'
import { ErrorHandler } from '../../components/common/Info/ErrorHandler'
import { Info } from '../../components/common/Info/Info'
import { Footer } from '../../components/Footer/Footer'
import { JoinButton } from '../../components/Footer/JoinButton/JoinButton'
import { MuteButton } from '../../components/Footer/MuteButton/MuteButton'
import { ToStageButton } from '../../components/Footer/WarpButtons/ToStageButton'
import { ToFoyerButton } from '../../components/Footer/WarpButtons/ToFoyerButton'
import { Spacer } from '../../components/Footer/Spacer'

import { Header } from '../../components/Header/Header'
import JitsiConnection from '../../components/JitsiConnection/JitsiConnection'
import { Localuser } from '../../components/Localuser/Localuser'
import { UserDragContainer } from '../../components/Localuser/LocalUserContainer'
import { PanWrapper } from '../../components/PanWrapper/PanWrapper'
import { Room } from '../../components/Room/Room'
import { Users } from '../../components/User/Users'
import { LocalStoreLogic } from '../../store/LocalStoreLogic'

export const Session = () => {
	return (
		<React.Fragment>
			<ErrorHandler />
			<Info>
				Welcome to our Prototype
				<br />
				Please use <b>Chrome</b> for now for a stable Experience
			</Info>
			<Header>Hybrid Stage by BoatPeopleProject e.V.</Header>
			<JitsiConnection />
			<LocalStoreLogic />
			<PanWrapper>
				<Room>
					<Users />
					<UserDragContainer>
						<Localuser audioRadius />
					</UserDragContainer>
				</Room>
			</PanWrapper>
			<Footer>
				<a href="/speaker/bpp">Speaker View</a>
				<a href="/beamer/bpp">Beamer View</a>
				<ToFoyerButton />
				<ToStageButton />
				<Spacer />
				<MuteButton />
				<Spacer />
				<JoinButton joined={true} />
			</Footer>
		</React.Fragment>
	)
}
