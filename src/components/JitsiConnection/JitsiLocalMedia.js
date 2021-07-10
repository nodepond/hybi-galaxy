import React, { useEffect } from 'react'
import { useConnectionStore } from './../../store/ConnectionStore'

const JitsiLocalMedia = () => {
  // First init or return jsMeet
  useConnectionStore(store => store.initJitsiMeet)
  // let the store refresh the list, so we are ready to use it from the store
  useConnectionStore(store => store.refreshLocalDevices)()

  const audioDevices = useConnectionStore(store => store.jsMeet?.audioDevices)
  const videoDevices = useConnectionStore(store => store.jsMeet?.videoDevices)
  const audioOutputDevices = useConnectionStore(store => store.jsMeet?.audioOutputDevices)
  

  useEffect(() => {
    console.log('audioDevices', audioDevices)
  }, [audioDevices])

  useEffect(() => {
    console.log('videoDevices', videoDevices)
  }, [videoDevices])

  useEffect(() => {
    console.log('audioOutputDevices', audioOutputDevices)
  }, [audioOutputDevices])

  return (null)
}

export default JitsiLocalMedia
