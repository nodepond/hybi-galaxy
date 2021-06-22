import * as React from 'react';
import styled from "styled-components";
import { useConferenceStore } from '../../store/ConferenceStore';
import { SpeakerUser } from "./SpeakerUser"

// https://1linelayouts.glitch.me
// https://codepen.io/una/pen/oNbvNQv
const SpeakerUsersContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

// TODO: render empty state

export const SpeakerUsers = () => {
  const {users} = useConferenceStore()
  console.log('users', users)
  return (
    <>
    {Object.entries(users).map(user => {
      console.log('user', user[1].room)
      // console.log('user', user[0].room)
      return(
        <SpeakerUsersContainer>
          { user[1].room === 'speaker' && <><SpeakerUser key={user[0]} user={user[1]} id={user[0]}/>
          </> }
        </SpeakerUsersContainer>
      )
    })}
    </>
  )
}