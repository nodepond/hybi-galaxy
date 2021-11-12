import * as React from 'react';
import { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import { useStageConnectionStore } from './../../store/StageConnectionStore'


const StageVideo = styled.video`
  background: none;
  width: 200px;
  height: 200px;
  object-position: 50% 50%;
  display: block;
  border-radius: 10px;
  object-fit: cover;
  transform: scaleX(-1);
`

export const StageVideoTrack = React.memo((id) => {
  const tracks = useStageConnectionStore(store => store.tracks)
  const myRef = useRef()

  useEffect(() => {
    const currentVideoElement = myRef.current
    console.log('tracks from within StageVideoTrack', tracks)
    tracks.map(track => {
      console.log('track video', track.track.kind)
      if (track.track.kind === 'video') {
        currentVideoElement.attach(track.track)
      }
    })
  }, [tracks])

  return (
    <StageVideo autoPlay={true} ref={myRef} className={`remoteTrack videoTrack ${id}video`} id={`${id}video`} />
  )
})

