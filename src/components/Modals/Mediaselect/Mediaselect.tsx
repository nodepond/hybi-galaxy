import React, { useEffect } from 'react'
import styled from 'styled-components'
import JitsiLocalMedia from '../../JitsiConnection/JitsiLocalMedia'
import { useConnectionStore } from '../../../store/ConnectionStore'
import { useConferenceStore } from '../../../store/ConferenceStore'
import { DeviceSelect } from './elements/DeviceSelect'
import { Footer } from '../../Footer/Footer'
import { BigHeadline } from '../../common/BigHeadline'
import { Button } from '../../common/Buttons/Button'
import { useLocalStore } from '../../../store/LocalStore'

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
  const refreshLocalDevices = useConnectionStore(store => store.refreshLocalDevices)
  const audioDevices = useConnectionStore(store => store.audioDevices)
  const videoDevices = useConnectionStore(store => store.videoDevices)
  
  const conferenceObject = useConferenceStore(store => store.conferenceObject)

  const toggleMediaselect = useLocalStore(store => store.toggleMediaselect)
  const audioTrack = useLocalStore(store => store.audio)
  const videoTrack = useLocalStore(store => store.video)
  const setLocalAudioTrack = useLocalStore(store => store.setLocalAudioTrack)
  const setLocalVideoTrack = useLocalStore(store => store.setLocalVideoTrack)

  const onAudioSelect = async (deviceId) => {
    await jsMeet
    ?.createLocalTracks({ devices: ["audio"], micDeviceId: deviceId, firePermissionPromptIsShownEvent: true }, true)
        .then(async tracks => {
          if (tracks.length) {
            await conferenceObject?.replaceTrack(audioTrack, tracks[0])
            setLocalAudioTrack(tracks[0])
          } else {
            console.log('Error in getting audio track for setting it...')
          }
        })
        .catch(error => {
          console.log(error)
        })
  }
  const onVideoSelect = async (deviceId) => {
    // There seems to be a small bug in the doku of lib-jitsi-meet.
    // https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ljm-api / JitsiMeetJS.createLocalTracks(options)
    // Docs says : to option.devices: - array with the devices - "desktop", "video" and "audio" that will be passed to GUM. If that property is not set GUM will try to get all available devices.
    // But indeed it needs type of device. Sending an empty array or omitting the param crashed the flow 
    // so we use: devices: ["video"]
    await jsMeet
      ?.createLocalTracks({ devices: ["video"], cameraDeviceId: deviceId, firePermissionPromptIsShownEvent: true }, true)
      .then(async tracks => { 
        if (tracks.length) {
          await conferenceObject?.replaceTrack(videoTrack, tracks[0])
          setLocalVideoTrack(tracks[0])
        } else {
          console.log('Error in getting video track for setting it...')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <React.Fragment>
      <CenterContainer>
        <BigHeadContainer>
          <BigHeadline>Audio- und Video-Input auswählen</BigHeadline>
        </BigHeadContainer>
        <MediaselectContainer>
          <JitsiLocalMedia />
          <div>Audio</div>
          <DeviceSelect devices={audioDevices} deviceSelect={(deviceId) => onAudioSelect(deviceId)} />
          <div>Video</div>
          <DeviceSelect devices={videoDevices} deviceSelect={(deviceId) => onVideoSelect(deviceId)} />
          <Button onClick={refreshLocalDevices}>Geräteliste aktualisieren</Button>
          <Button onClick={toggleMediaselect}>Schließen</Button>
        </MediaselectContainer>
      </CenterContainer>
      <Footer />
    </React.Fragment>
  )
}
