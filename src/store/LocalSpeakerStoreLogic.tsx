import React from 'react'
import { useEffect } from "react"
import { useConferenceStore } from "./ConferenceStore"
import { useConnectionStore } from "./ConnectionStore"
import { useLocalStore } from "./LocalStore"

// LocalSpeaker has dependency on ConferenceStore.
// This component provides the communication from ConferenceStore to LocalSpeaker.
export const LocalSpeakerStoreLogic = () => {
  const conference = useConferenceStore(state => state.conferenceObject)
  // const calculateVolumes = useConferenceStore((store) => store.calculateVolumes)
  // const id = useLocalStore(store => store.id)
  // const pos = useLocalStore(store => store.pos)
  // const room = useLocalStore(store => store.room)
  const setLocalTracks = useLocalStore(store => store.setLocalTracks)
  const setMyID = useLocalStore(store => store.setMyID)
  const initJitsiMeet = useConnectionStore(store => store.initJitsiMeet)
  const jsMeet = useConnectionStore(store => store.jsMeet)

  useEffect(() => {
    initJitsiMeet()
  }, [initJitsiMeet])
  
  useEffect(()=>{
    if(conference?.myUserId()) setMyID(conference.myUserId())
  },[conference, setMyID])
  
  // TODO: delete init of audio and video track, if we see, that are actually really unneeded
  useEffect(() => {
      jsMeet
        ?.createLocalTracks({ devices: [ 'audio', 'video' ] }, true)
        .then(tracks => {setLocalTracks(tracks)})
        .catch(error => {
          console.log(error)
        });
  },[ jsMeet, setLocalTracks ])

  return null
}