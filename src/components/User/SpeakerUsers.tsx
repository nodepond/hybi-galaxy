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

export const SpeakerUsers = () => {
  const { users } = useConferenceStore()
  const usersArray = Object.entries(users)
  const speakers = usersArray.filter(user => {
    return user[1].room === 'speaker'
  })
  return (
    speakers.length === 0 ? 
    <div>Aktuell keine Sprecher*innen</div> :
    <SpeakerUsersContainer>
      {speakers.map(user => {
        return(
          <SpeakerUser key={user[0]} user={user[1]} id={user[0]}/>
        )}
      )}
    </SpeakerUsersContainer>
  )
}
