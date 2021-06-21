import * as React from 'react';
import { useConferenceStore } from '../../store/ConferenceStore';
import { SpeakerUser } from "./SpeakerUser"

export const SpeakerUsers = () => {

  const {users} = useConferenceStore()
  console.log('users', users)
  return (
    <>
    {Object.entries(users).map(user => {
      console.log('user', user[1].room)
      // console.log('user', user[0].room)
      return(
        <>
        { user[1].room === 'speaker' && <SpeakerUser key={user[0]} user={user[1]} id={user[0]}/> }
        </>
      )
    })}
    </>
  )
}