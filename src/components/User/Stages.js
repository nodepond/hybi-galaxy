import * as React from 'react'
import { useStageConnectionStore } from './../../store/StageConnectionStore'
import { Stage } from "../StageElements/Stage"

export const Stages = () => {
  const { users } = useStageConnectionStore()
  return (
    <>
      {users.map(user => {
        return(
          <Stage key={`${user._id}-stagecontainer`} user={user} pos={ { x: 3755, y: 2560, width: 1813, height: 1130} } />
        )
      })}
    </>
  )
}
