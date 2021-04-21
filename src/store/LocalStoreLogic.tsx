import React from 'react'
import { useEffect } from "react"
import { useConferenceStore } from "./ConferenceStore"
import { useConnectionStore } from "./ConnectionStore"
import { useLocalStore } from "./LocalStore"
import { throttle } from "lodash"


const sendPositionToPeers = (pos:string, conferenceObject) => {
  conferenceObject?.sendCommand("pos", { value: pos })
}
const sendRoomToPeers = (room:string, conferenceObject) => {
  console.log('sendRoomToPeers called with ', room)
  conferenceObject?.sendCommand("room", { value: room })
}
//throttle mustnt be rerendered or it wont work
const throttledSendPos = throttle(sendPositionToPeers, 200)
const throttledSendRoom = throttle(sendRoomToPeers, 200)

// LocalStore has dependency on ConferenceStore.
// This component provides the communication from ConferenceStore to LocalStore.
export const LocalStoreLogic = () => {
  const conference = useConferenceStore(state => state.conferenceObject)
  const calculateVolumes = useConferenceStore((store) => store.calculateVolumes)
  const id = useLocalStore(store => store.id)
  const pos = useLocalStore(store => store.pos)
  const room = useLocalStore(store => store.room)
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
  
  useEffect(() => {
      jsMeet
        ?.createLocalTracks({ devices: [ 'audio', 'video' ] }, true)
        .then(tracks => {setLocalTracks(tracks)})
        .catch(error => {
          console.log(error)
        });
  },[ jsMeet, setLocalTracks ])

  useEffect(()=>{
    if(id) {
      const newPos = JSON.stringify({...pos, id: id})
      throttledSendPos(newPos, conference)
      const newRoom = JSON.stringify({room, id: id})
      throttledSendRoom(newRoom, conference)
      // calculate all volumes from other users on thie playfield after moving myself
      calculateVolumes(room, pos)
    }
  },[pos, room, id, conference, calculateVolumes])
  
  return null
}