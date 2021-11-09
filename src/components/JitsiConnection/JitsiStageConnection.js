import React, { useEffect } from 'react'
import { useStageConnectionStore } from './../../store/StageConnectionStore'
// import { useConferenceStore } from './../../store/ConferenceStore'
import { useParams } from 'react-router-dom'

 /* globals: JitisMeetJS */

const JitsiStageConnection = () => {
  const disconnectServer = useStageConnectionStore(store => store.disconnectServer)
  const jsMeet = useStageConnectionStore(store => store.initJitsiMeet)
  const connectServer = useStageConnectionStore(store => store.connectServer)
  const initJitsiMeet = useStageConnectionStore(store => store.initJitsiMeet)
  const connected = useStageConnectionStore(store => store.connected)
  
  // const initConference = useConferenceStore(store => store.init)

  useEffect(() => {
    // jitsi might have been initialized in enter.tsx.
    // But session "/session/:id" might have been called directly, so initJitsiMeet should be called.
    initJitsiMeet()
  }, [initJitsiMeet])

  useEffect(() => {
    connectServer()
    return () => disconnectServer()
  }, [initJitsiMeet, connectServer, disconnectServer])

  // useEffect(() => {
  //   if(jsMeet && connected) {
  //     initConference(id)
  //   }
  // }, [jsMeet, connected, initConference, id])


  return (
    null
  )
}

export default JitsiStageConnection