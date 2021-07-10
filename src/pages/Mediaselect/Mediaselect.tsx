import React, { useEffect } from 'react'
import styled from 'styled-components'
import JitsiLocalMedia from '../../components/JitsiConnection/JitsiLocalMedia'
import { useConnectionStore } from './../../store/ConnectionStore'
import { DeviceSelect } from './elements/DeviceSelect'
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

export const Mediaselect = () => {
  const jsMeet = useConnectionStore(store => store.jsMeet)

  const onAudioSelect = (deviceId) => {
    console.log('onAudioSelect***', deviceId)
    if (jsMeet) jsMeet.selectedAudioDeviceId = deviceId
    if (jsMeet) console.log('selectedAudioDeviceId**********', jsMeet.selectedAudioDeviceId)
  }
  const onVideoSelect = (deviceId) => {
    console.log('onVideoSelect***', deviceId)
    if (jsMeet) jsMeet.selectedVideoDeviceId = deviceId
    if (jsMeet) console.log('selectedVideoDeviceId**********', jsMeet.selectedVideoDeviceId)
  }

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
          <div>AUDIOSELECT</div>
          <DeviceSelect devices={jsMeet?.audioDevices} deviceSelect={(deviceId) => onAudioSelect(deviceId)} />
          <div>VIDEOSELECT</div>
          <DeviceSelect devices={jsMeet?.videoDevices} deviceSelect={(deviceId) => onVideoSelect(deviceId)} />
        </MediaselectContainer>
      </CenterContainer>
      <Footer />
    </React.Fragment>
  )
}
