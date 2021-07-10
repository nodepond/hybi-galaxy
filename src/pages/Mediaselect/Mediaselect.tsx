import React from 'react'
import styled from 'styled-components'
import JitsiLocalMedia from '../../components/JitsiConnection/JitsiLocalMedia'
import { AudioSelect } from './elements/AudioSelect'
import { ReactComponent as Wave } from './../../assets/wave.svg'
import { Footer } from '../../components/Footer/Footer'
import { BigHeadline } from './../../components/common/BigHeadline'
import { SubHeadline } from '../../components/common/SubHeadline'
import { Info } from '../../components/common/Info/Info'

const BigHeadContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const CenterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
`

const MediaselectContainer = styled.div`
	margin-top: 40px;
`

const audioSelect = (audioDevice) => {
  console.log('audioSelect audioDevice', audioDevice)
}

export const Mediaselect = () => {
  return (
    <React.Fragment>
      <Info>
        Onboarding
      </Info>
      <CenterContainer>
        <BigHeadContainer>
          <Wave />
          <BigHeadline>MEDIASELECT</BigHeadline>
        </BigHeadContainer>
        <SubHeadline>Das hybride Theater-Foyer vom boat people projekt</SubHeadline>
        <MediaselectContainer>
          <JitsiLocalMedia />
          <AudioSelect audioSelect={(e) => audioSelect(e)} />
        </MediaselectContainer>
      </CenterContainer>
      <Footer />
    </React.Fragment>
  )
}
