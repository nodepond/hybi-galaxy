import * as React from 'react';
import { useConferenceStore } from './../../store/ConferenceStore';
import { User } from "./User"

export const Users = () => {
  const { users } = useConferenceStore()
  return (
    <>
    {Object.entries(users).map(user => {
      return(
        <User key={user[0]} user={user[1]} id={user[0]} />
      )
    })}
    </>
  )
}