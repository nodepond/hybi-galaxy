import * as React from 'react';
import { useConferenceStore } from '../../store/ConferenceStore';
import { BeamerUser } from "./BeamerUser"

export const BeamerUsers = () => {

  const {users} = useConferenceStore()
  return (
    <>
    {Object.entries(users).map(user => {
      return(
          <BeamerUser key={user[0]} user={user[1]} id={user[0]}/>
      )
    })}
    </>
  )
}