import React from 'react';
// import { useConferenceStore } from '../../store/ConferenceStore';
import { BeamerVideoTrack } from './BeamerVideoTrack';

export const BeamerUser = ({id, user}) => {
  // const myRoom = useConferenceStore(useCallback(store => store.users[id]['room'], [id]))

  return(
    <div className="userContainer" >
      <BeamerVideoTrack id={id} />
    </div>
  )
}
