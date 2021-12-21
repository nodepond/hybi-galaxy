import * as React from 'react';
import { useEffect, useRef } from "react"
import { useStageConnectionStore } from './../../store/StageConnectionStore'
import { useLocalStore } from "../../store/LocalStore"

export const StageAudioTrack = React.memo(({id, audioEnabledAtRooms}) => {
  const tracks = useStageConnectionStore(store => store.tracks)
  const room = useLocalStore(store => store.room)
  const myRef = useRef()

  let audioTrack
  let volume = 0

  useEffect(() => {
    volume = audioEnabledAtRooms.includes(room) ? 1 : 0
    console.log('Stage Audio, local user entered room', room, volume)
    myRef.current.volume = volume
  }, [room])

  useEffect(() => {
    const currentAudioElement = myRef.current

    tracks.map(track => {
      if (track.track.kind === 'audio' && track.ownerEndpointId === id) {
        audioTrack = track
        track?.attach(currentAudioElement)

        // alternative way to attach the track
        // track.stream.addTrack(track.track)
        // currentVideoElement.srcObject = track.stream
      }
    })
    return(() => {
      audioTrack?.detach(currentAudioElement)
      audioTrack?.dispose()
    })
  }, [tracks])

  // On Firefox, if the media permissions are "Allowed Temporarily" ("Remember this decision" is unchecked in permission prompt);
  // then Autoplay will be set to Block Audio; resulting the audio of other users not to be heard.
  // To overcome this problem, we reattach remote audio track on permission is granted. If permission is granted, localAudioTrack is available; so we track its object reference.
  // useEffect(() => {
  //   const currentElement = myRef.current
  //   audioTrack?.detach(currentElement)
  //   audioTrack?.attach(currentElement)
  // }, [localAudioTrack])

  return (
    <audio autoPlay={true} ref={myRef} className={`remoteTrack audioTrack ${id}-audio`} id={`${id}-audio`} />
  )
})

