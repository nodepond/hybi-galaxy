import * as React from 'react';
import { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import { useStageConnectionStore } from './../../store/StageConnectionStore'


const StageVideo = styled.video`
  background: none;
  width: 100%;
  height: 100%;
  object-position: 50% 50%;
  display: block;
  border-radius: 10px;
  object-fit: cover;
  transform: scaleX(-1);
`

export const StageVideoTrack = React.memo(({id}) => {
  const { tracks } = useStageConnectionStore()
  const myRef = useRef()
  let videoTrack

  useEffect(() => {
    const currentVideoElement = myRef.current
    
    // Notice how MediaStream and MediaStreamTrack works
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/addTrack
    
    tracks.map(track => {
      if (track.track.kind === 'video' && track.ownerEndpointId === id) {
        videoTrack = track
        track?.attach(currentVideoElement)

        // alternative way to attach the track
        // track.stream.addTrack(track.track)
        // currentVideoElement.srcObject = track.stream
      }
    })
    return(() => {
      videoTrack?.detach(currentVideoElement)
    })
  }, [tracks])

  // const onVideoClicked = (e) => {
  //   videoTrack?.detach(e.target)
  //   videoTrack?.attach(e.target)
  // }

  return (
    <StageVideo autoPlay={true} ref={myRef} className={`remoteTrack videoTrack ${id}-video`} id={`${id}-video`} />
  )
})

