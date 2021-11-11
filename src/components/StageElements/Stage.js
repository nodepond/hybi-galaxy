import React, { useCallback, useEffect, useRef } from 'react';
import { useStageConnectionStore } from './../../store/StageConnectionStore'
import { StageVideoTrack } from './StageVideoTrack'

export const Stage = ({pos, user}) => {
  useEffect(() => {
    console.log('user', user)
    console.log('user.displayName', user._displayName)
  }, [user])

  return(
    <div style={{ position:'absolute', left:`${pos.x}px`, top:`${pos.y}px` }} className="stageContainer" >
      HALLO
      {user._displayName}
      <StageVideoTrack id={Math.random().toString()} />
    </div>
  )
}
