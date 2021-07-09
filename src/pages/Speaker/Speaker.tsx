import React from 'react'
import { ErrorHandler } from '../../components/common/Info/ErrorHandler'
import { Info } from '../../components/common/Info/Info'

import { Header } from '../../components/Header/Header'
import JitsiConnection from '../../components/JitsiConnection/JitsiConnection'
import { SpeakerUsers } from '../../components/User/SpeakerUsers'
import { LocalSpeakerStoreLogic } from '../../store/LocalSpeakerStoreLogic'

export const Speaker = () => {
	return (
		<React.Fragment>
			<ErrorHandler />
			<Info>
				Hybi-Galaxy Speaker-View
			</Info>
			<JitsiConnection />
			<LocalSpeakerStoreLogic />
			<SpeakerUsers />
		</React.Fragment>
	)
}
