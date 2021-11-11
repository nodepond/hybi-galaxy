import * as React from 'react'
import { useStageConnectionStore } from './../../store/StageConnectionStore'
import { Stage } from "../StageElements/Stage"

export const Stages = () => {
  const { users } = useStageConnectionStore()
  return (
    <>
      {users.map(user => {
        console.log('**user', user)
        return(
          <Stage key={user._id} user={user} pos={ { x: 3270-100, y: 1960-100} } />
        )
      })}
    </>
  )
}
