import React, { useCallback } from 'react';
import { Button } from './../../common/Buttons/Button';
import {FaMicrophoneSlash, FaMicrophone} from 'react-icons/fa'
import { useLocalStore } from './../../../store/LocalStore';

export const MuteButton = () => {
  const toggleMute = useLocalStore(store => store.toggleMute)
  const mute = useLocalStore(store => store.mute)

  if (mute) {
    return <Button type="danger" onClick={toggleMute}><FaMicrophoneSlash/> Mikrophon an</Button>
  } else {
    return <Button type="secondary" onClick={toggleMute}><FaMicrophone/> Stummschalten</Button>
  }
}
