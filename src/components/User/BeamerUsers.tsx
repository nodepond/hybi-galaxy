import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { useConferenceStore } from '../../store/ConferenceStore'
import { BeamerUser } from './BeamerUser'
import { ReactComponent as LogoSvg } from '../../assets/logoboat_white_circle.svg';

const fadeOut = keyframes`
 0% { opacity: 0; }
 100% { opacity: 1; }
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
  animation-duration: 12s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`

// https://1linelayouts.glitch.me
// https://codepen.io/una/pen/oNbvNQv
const BeamerUsersBigGridContainer = styled.div`
  background-color: black;
  display: grid;
  height: 100vh;
  grid-gap: 0rem;
  grid-template-columns: repeat(auto-fit, minmax(610px, 1fr));
`
const BeamerUsersContainer = styled.div`
  background-color: black;
  display: grid;
  height: 50vh;
  grid-gap: 0rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

export const BeamerUsers = () => {
  const { users } = useConferenceStore()
  const usersArray = Object.entries(users)
  const allowedRooms = ['speaker', 'stage', 'seat-1', 'seat-2', 'seat-3', 'seat-4', 'seat-5', 'seat-6', 'seat-7', 'seat-8', 'seat-9', 'seat-10', 'seat-11', 'seat-12', 'seat-13', 'seat-14', 'seat-15', 'seat-16', 'seat-17', 'seat-18', 'seat-19', 'seat-20', 'seat-21', 'seat-22', 'seat-23', 'seat-24']
  const beamerUsers = usersArray.filter(user => {
    return (user[1].video && allowedRooms.includes(user[1].room.toString()))
  })

  // let refreshToggle = true

  // function refresh () {
  //   console.log('refresh... 1')
  //   beamerUsers.map(user => user[1]?.video?.play())
  //   refreshToggle = false
  //   setTimeout(() => {
  //     console.log('refresh... 2')
  //     refreshToggle = true
  //   }, 1000)
  // }

  return (
    <>
      {beamerUsers.length === 0 &&
        <LogoContainer>
          <LogoFade>
            <LogoSvg />
          </LogoFade>
        </LogoContainer>}
    
      {beamerUsers.length <= 4 &&
        <BeamerUsersBigGridContainer>
          {beamerUsers.map(user => {
            return (
              <>
                <BeamerUser key={user[0]} user={user[1]} id={user[0]} />
              </>
            )
          })
          }
        </BeamerUsersBigGridContainer>}

      {beamerUsers.length > 4 &&
        <BeamerUsersContainer>
          {beamerUsers.map(user => {
            return (
              <>
                <BeamerUser key={user[0]} user={user[1]} id={user[0]} />
              </>
            )
          })
          }
        </BeamerUsersContainer>}
    </>
  )
}
