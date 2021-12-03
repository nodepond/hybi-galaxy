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
  }, [jsMeet])

  useEffect(() => {
    if (!jsMeet) return
    const getDevices = async () => {
      await refreshLocalDevices()
    }
    getDevices()
  }, [jsMeet, refreshLocalDevices])

  return (null)
}

export default JitsiLocalMedia
