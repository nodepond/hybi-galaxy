import * as React from 'react'
import { useStageConnectionStore } from './../../store/StageConnectionStore'
import { Stage } from "../StageElements/Stage"

// This is to prevent a crash, when an client with invalid stage name connects
const validStageNames = ['stage']

const stageCamsConfig = {
  'stage': { x: 3755, y: 2560, width: 1813, height: 1130 }
}

export const Stages = () => {
  const { users } = useStageConnectionStore()
  return (
    <>
      {users.map(user => {
        const selectedStage = user?._displayName?.toLowerCase()
        return(
          validStageNames.includes(selectedStage) && <Stage key={`${user._id}-stagecontainer`} user={user} pos={stageCamsConfig[selectedStage]} />
        )
      })}
    </>
  )
}
