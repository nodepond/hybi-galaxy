import { StageVideoTrack } from './StageVideoTrack'
import { StageAudioTrack } from './StageAudioTrack'

export const Stage = ({pos, user}) => {
  return(
    <div key={`${user._id}-stagecontainer`} style={{ position:'absolute', left:`${pos.x}px`, top:`${pos.y}px`, width:`${pos.width}px`, height:`${pos.height}px` }} className="stageContainer" >
      <StageVideoTrack id={user._id} key={`${user._id}-videostage`} />
      <StageAudioTrack id={user._id} key={`${user._id}-audiostage`} />
    </div>
  )
}
