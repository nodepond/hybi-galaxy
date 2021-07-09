import React from 'react';
// import { useConferenceStore } from '../../store/ConferenceStore';
import { SpeakerVideoTrack } from './SpeakerVideoTrack'
import { AudioTrack } from './AudioTrack'

export const SpeakerUser = ({id, user}) => {
  // const myRoom = useConferenceStore(useCallback(store => store.users[id]['room'], [id]))
  return(
    <div className="speakerContainer" >
      <SpeakerVideoTrack id={id} />
      <AudioTrack id={id} volume={1} />
    </div>
  )
}
