import * as React from 'react';
import styled from "styled-components";
import { useConferenceStore } from '../../store/ConferenceStore';
import { BeamerUser } from "./BeamerUser"

// https://1linelayouts.glitch.me
// https://codepen.io/una/pen/oNbvNQv
const BeamerUsersContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

export const BeamerUsers = () => {
  const {users} = useConferenceStore()
  const usersArray = Object.entries(users)
  // const speakers = usersArray.filter(user => {
  //   return user[1].room === 'speaker'
  // })

  return (
    usersArray.length === 0 ? 
    <div>Keiner Besucher*innen im Foyer</div> :
    <BeamerUsersContainer>
      {usersArray.map(user => {
        return(
          <BeamerUser key={user[0]} user={user[1]} id={user[0]}/>
        )}
      )}
    </BeamerUsersContainer>
  )
}