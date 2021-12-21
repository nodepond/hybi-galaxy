import * as React from 'react';
import { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import { useStageConnectionStore } from './../../store/StageConnectionStore'

export const StageAudioTrack = React.memo(({id, volume}) => {
  const tracks = useStageConnectionStore(store => store.tracks)
  const myRef = useRef()

  let audioTrack

  useEffect(() => {
    myRef.current.volume = volume
  }, [volume])

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

