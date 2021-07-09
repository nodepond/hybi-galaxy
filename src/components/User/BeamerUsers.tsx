import * as React from 'react'
import styled from 'styled-components'
import { useConferenceStore } from '../../store/ConferenceStore'
import { BeamerUser } from './BeamerUser'

// https://1linelayouts.glitch.me
// https://codepen.io/una/pen/oNbvNQv
const BeamerUsersContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

export const BeamerUsers = () => {
  const { users } = useConferenceStore()
  const usersArray = Object.entries(users)
  const allowedRooms = ['speaker', 'stage', 'seat-1', 'seat-2', 'seat-3', 'seat-4', 'seat-5', 'seat-6', 'seat-7', 'seat-8', 'seat-9', 'seat-10', 'seat-11', 'seat-12', 'seat-13', 'seat-14', 'seat-15', 'seat-16', 'seat-17', 'seat-18', 'seat-19', 'seat-20', 'seat-21', 'seat-22', 'seat-23', 'seat-24']
  const beamerUsers = usersArray.filter(user => {
    // console.log('user[1].room', user)
    // console.log('user[1].room xx', user[1].pos.x === 0)
    // console.log('user[1].room yy', user[1].pos.y === 0)
    // console.log('user[1].room zz', user[1].pos.x === 0 && user[1].pos.y === 0)
    
    // const isOrigin = (user[1].pos.x === 0 && user[1].pos.y === 0)
    // console.log('isOrigin', isOrigin)

    // return !isOrigin
    // console.log('user***helo', user, user[1].room.toString(), allowedRooms.includes(user[1].room.toString()))

    return (user[1].video && allowedRooms.includes(user[1].room.toString()))
  })

  return (
    beamerUsers.length === 0
      ? <div>Aktuell keine Besucher*innen</div>
      : <BeamerUsersContainer>
        {beamerUsers.map(user => {
          return (
            <>
              <BeamerUser key={user[0]} user={user[1]} id={user[0]} />
            </>
          )
        })
        }
      </BeamerUsersContainer>
  )
}
