import React, { useCallback } from 'react';
import { useConferenceStore } from '../../store/ConferenceStore';
import { VideoTrack } from './VideoTrack';

export const BeamerUser = ({id, user}) => {
  const myRoom = useConferenceStore(useCallback(store => store.users[id]['room'], [id]))

  return(
    <div className="userContainer" >
      <VideoTrack id={id} />
      <div>{myRoom}</div>
    </div>
  )
}
