import React, { useEffect } from 'react'
import { useConnectionStore } from './../../store/ConnectionStore'

const JitsiLocalMedia = () => {
  // First init or return jsMeet
  const initJitsiMeet = useConnectionStore(store => store.initJitsiMeet)

  const refreshLocalDevices = useConnectionStore(store => store.refreshLocalDevices)
  const jsMeet = useConnectionStore(store => store.jsMeet)

  useEffect(() => {
    const init = async () => {
      await initJitsiMeet()
    }
    init()
  }, [initJitsiMeet])

  useEffect(() => {
    if (!jsMeet) return
    const getDevices = async () => {
      await refreshLocalDevices()
    }
    getDevices()
    // console.log('audioDevices', jsMeet.audioDevices)
    // console.log('videoDevices', jsMeet.videoDevices)
    // console.log('audioOutputDevices', jsMeet.audioOutputDevices)
  }, [jsMeet, refreshLocalDevices])

  return (null)
}

export default JitsiLocalMedia
