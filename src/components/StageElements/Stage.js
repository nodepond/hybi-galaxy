import { StageVideoTrack } from './StageVideoTrack'
import { StageAudioTrack } from './StageAudioTrack'

export const Stage = ({pos, stage, audioEnabledAtRooms}) => {

  return(
    <div key={`${stage._id}-stagecontainer`} style={{ position:'absolute', left:`${pos.x}px`, top:`${pos.y}px`, width:`${pos.width}px`, height:`${pos.height}px` }} className="stageContainer" >
      <StageVideoTrack id={stage._id} key={`${stage._id}-videostage`} />
      <StageAudioTrack id={stage._id} audioEnabledAtRooms={audioEnabledAtRooms} key={`${stage._id}-audiostage`} />
    </div>
  )
}
