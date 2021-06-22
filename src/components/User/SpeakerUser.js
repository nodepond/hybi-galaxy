import React from 'react';
// import { useConferenceStore } from '../../store/ConferenceStore';
import { SpeakerVideoTrack } from './SpeakerVideoTrack';

export const SpeakerUser = ({id, user}) => {
  // const myRoom = useConferenceStore(useCallback(store => store.users[id]['room'], [id]))
  return(
    <div className="speakerContainer" >
      <SpeakerVideoTrack id={id} />
    </div>
  )
}
