import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { useConferenceStore } from '../../store/ConferenceStore'
import { SpeakerUser } from './SpeakerUser'
import { ReactComponent as LogoSvg } from '../../assets/logoboat_white_circle.svg';


const fadeOut = keyframes`
 0% { opacity: 1; }
 100% { opacity: 0; }
`

const LogoContainer = styled.div`
  background-color: black;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const LogoFade = styled.div`
  margin: 5%;
  animation-name: ${fadeOut};
  animation-duration: 8s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`

// https://1linelayouts.glitch.me
// https://codepen.io/una/pen/oNbvNQv
const SpeakerUsersBigGridContainer = styled.div`
  background-color: black;
  display: grid;
  height: 100vh;
  grid-gap: 0rem;
  grid-template-columns: repeat(auto-fit, minmax(610px, 1fr));
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
        <LogoContainer>
          <LogoFade>
            <LogoSvg />
          </LogoFade>
        </LogoContainer>}
    
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
