import React, { useCallback, useEffect, useRef } from 'react';
import { useConferenceStore } from '../../store/ConferenceStore';
import { ReloadHint } from '../ReloadHint/ReloadHint';
import { AudioTrack } from './AudioTrack';
import { MuteIndicator } from './MuteIndicator';
import { VideoTrack } from './VideoTrack';
import { NameTag } from '../NameTag/NameTag';

export const User = ({id, user}) => {
  const myPos = useConferenceStore(useCallback(store => store.users[id]['pos'], [id]))
  const myVolume = useConferenceStore(useCallback(store => store.users[id]['volume'], [id]))
  const myRoom = useConferenceStore(useCallback(store => store.users[id]['room'], [id]))
  const isMute = useConferenceStore(useCallback(store => store.users[id]['mute'],[id]))
  const calculateVolume = useConferenceStore(useCallback(store => store.calculateVolume, []))
  
  const opacity = useRef();

  useEffect(() => {
    calculateVolume(id)
    
    // workaround to hide speaker und beamer user in foyer
    const isOrigin = (myPos.x === 0 && myPos.y === 0)
    isOrigin ? opacity.current = 0 : opacity.current = 100
    //console.log('User.js***', myPos.x, myPos.y, opacity.current)

  },[id, calculateVolume, myPos])

  return(
    <div style={{ position:'absolute', left:`${myPos.x}px`, top:`${myPos.y}px`, opacity: `${opacity.current}` }} className="userContainer" >
      <VideoTrack id={id} />
      <ReloadHint />
      <AudioTrack id={id} volume={myVolume} />
      <NameTag>{user?.user?._displayName || 'Zuschauer*in'}</NameTag>
      <div>Volume {Math.round(myVolume * 11)}</div>
      <div>Room {myRoom}</div>
      {isMute && <MuteIndicator>🤭</MuteIndicator>}
    </div>
  )
}


