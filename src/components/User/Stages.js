import * as React from 'react'
import { useStageConnectionStore } from './../../store/StageConnectionStore'
import { Stage } from "../StageElements/Stage"

// This is to prevent a crash, when an client with invalid stage name connects
const validStageNames = ['stage']

const stageCamsConfig = {
  'stage': { 
    pos: { x: 3755, y: 2560, width: 1813, height: 1130 },
    audioEnabledAtRooms: ['stage', 'seat-1', 'seat-2', 'seat-3', 'seat-4', 'seat-5', 'seat-6', 'seat-7', 'seat-8', 'seat-9', 'seat-10', 'seat-11', 'seat-12', 'seat-13', 'seat-14', 'seat-15', 'seat-16', 'seat-17', 'seat-18', 'seat-19', 'seat-20', 'seat-21', 'seat-22', 'seat-23', 'seat-24']
  }
}

export const Stages = () => {
  const { users } = useStageConnectionStore()

  return (
    <>
      {users.map(stage => {
        const selectedStage = stage?._displayName?.toLowerCase()

        return(
          validStageNames.includes(selectedStage) && 
            <Stage
              key={`${stage._id}-stagecontainer`}
              stage={stage}
              audioEnabledAtRooms={stageCamsConfig[selectedStage].audioEnabledAtRooms}
              pos={stageCamsConfig[selectedStage].pos}
            />
        )
      })}
    </>
  )
}
