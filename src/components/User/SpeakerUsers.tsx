import * as React from 'react'
import styled from 'styled-components'
import { useConferenceStore } from '../../store/ConferenceStore'
import { SpeakerUser } from './SpeakerUser'

// https://1linelayouts.glitch.me
// https://codepen.io/una/pen/oNbvNQv
const SpeakerUsersBigGridContainer = styled.div`
  background-color: black;
  display: grid;
  height: 100vh;
  grid-gap: 0rem;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
`
const SpeakerUsersContainer = styled.div`
  background-color: black;
  display: grid;
  height: 50vh;
  grid-gap: 0rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

export const SpeakerUsers = () => {
  const { users } = useConferenceStore()
  const usersArray = Object.entries(users)
  const speakerUsers = usersArray.filter(user => {
    return user[1].room === 'speaker'
  })
  return (
    <>
      {speakerUsers.length === 0 &&
        <div>Aktuell keine Sprecher*innen</div>}
    
      {speakerUsers.length <= 4 &&
        <SpeakerUsersBigGridContainer>
          {speakerUsers.map(user => {
            return (
              <>
                <SpeakerUser key={user[0]} user={user[1]} id={user[0]} />
              </>
            )
          })
          }
        </SpeakerUsersBigGridContainer>}

      {speakerUsers.length > 4 &&
        <SpeakerUsersContainer>
          {speakerUsers.map(user => {
            return (
              <>
                <SpeakerUser key={user[0]} user={user[1]} id={user[0]} />
              </>
            )
          })
          }
        </SpeakerUsersContainer>}
    </>
  )
}
