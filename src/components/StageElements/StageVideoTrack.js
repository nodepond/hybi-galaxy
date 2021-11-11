import * as React from 'react';
import { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import { useConferenceStore } from './../../store/ConferenceStore';
import { useLocalStore } from './../../store/LocalStore';


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
  // const videoTrack = useConferenceStore(useCallback(store => store.users[id].video, [id]))
  const myRef = useRef()

  useEffect(() => {
  }, [])

  return (
    <StageVideo autoPlay={true} ref={myRef} className={`remoteTrack videoTrack ${id}video`} id={`${id}video`} />
  )
})

