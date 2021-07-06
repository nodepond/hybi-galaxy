import produce from "immer";
import create from "zustand";
import { Track, User } from "./ConferenceStore";
import { panOptions, transformWrapperOptions } from "../components/PanWrapper/panOptions";
import { mountStoreDevtool } from "simple-zustand-devtools";

export type Point = {x:number, y:number}

type Store = {
  setLocalTracks: (tracks:Track[]) => void
  toggleMute: () => void
  clearLocalTracks: () => void
  setMyID: (id:string) => void
} & User

export const useLocalBeamerStore = create<Store>((set,get) => {
  const state = {
    id:"",
    mute: true,
    volume: 1,
    video: undefined,
    audio: undefined,
    pos: panOptions.user.initialPosition,
    pan: {x: transformWrapperOptions.defaultPositionX || 0, y: transformWrapperOptions.defaultPositionY || 0},
    scale: 1,
    room: 'default'
  }

  // # Private Functions
  const _produceAndSet = (callback:(newState:Store)=>void)=>set(state => produce(state, newState => callback(newState)))
  
  const toggleMute = () => {
    const audioTrack = get().audio
    if(!audioTrack) return
    if(audioTrack.isMuted()) {
      audioTrack.unmute()
      set({mute:false})
    } else {
      audioTrack.mute()
      set({mute:true})
    }
  }

  const setLocalTracks = tracks => _produceAndSet(newState=>{
    const audioTrack = tracks.find(t=>t.getType() === 'audio')
    const videoTrack = tracks.find(t=>t.getType() === 'video')
    newState.video = videoTrack
    newState.audio = audioTrack
  })

  const clearLocalTracks = () => _produceAndSet(newState=>{
    newState.audio=undefined
    newState.video=undefined
  })

  const setMyID = (id:string) => set({id:'beamer'})


  return {
  ...state,
  setLocalTracks,
  toggleMute,
  clearLocalTracks,
  setMyID
}
})

if (process.env.NODE_ENV === "development") {
  let root = document.createElement('div');
  root.id = 'simple-zustand-devtools-3';
  document.body.appendChild(root);

  mountStoreDevtool("LocalBeamerStore", useLocalBeamerStore, root)
}