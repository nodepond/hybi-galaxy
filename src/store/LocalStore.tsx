import produce from "immer";
import create from "zustand";
import { Track, User } from "./ConferenceStore";
import { panOptions, transformWrapperOptions } from "../components/PanWrapper/panOptions";
import { mountStoreDevtool } from "simple-zustand-devtools";

export type Point = {x:number, y:number}
type ZoomPan = {
  pos:Point
  pan:Point 
  scale:number
  onPanChange: (params:any) => void
} 

type Store = {
  setLocalPosition: (newPosition:Point) => void
  setLocalTracks: (tracks:Track[]) => void
  toggleMute: () => void
  clearLocalTracks: () => void
  setMyID: (id:string) => void
} & User & ZoomPan

export const useLocalStore = create<Store>((set,get) => {
  const state = {
    id: "",
    mute: false,
    volume: 1,
    video: undefined,
    audio: undefined,
    pos: panOptions.user.initialPosition,
    pan: {
      x: transformWrapperOptions.defaultPositionX || 0,
      y: transformWrapperOptions.defaultPositionY || 0
    },
    scale: 1,
    room: 'room-0'
  }

  // Private Functions
  const _produceAndSet = (callback:(newState:Store)=>void)=>set(state => produce(state, newState => callback(newState)))

  const isHittingRoom = (newPosition, roomname = "room1") => {
    let rootSvg = document.getElementById('RootSvg')
    let svg = document.getElementsByClassName(roomname)
    const isHitting = Array.prototype.map.call(svg, path => {
      // please notice, that right at the moment isPointInFill() with DOMPoints only works in safari right now. This is why we use the version that inits with SVGPoint. Works on most modern browsers atm.
      // return path.isPointInFill(new DOMPoint(newPosition.x, newPosition.y))

      // @ts-ignore
      let myPoint = rootSvg.createSVGPoint()
      myPoint.x = newPosition.x + 100
      myPoint.y = newPosition.y + 100
      return path.isPointInFill(myPoint)
    })
    return isHitting.includes(true)
  }

  // # Public Functions
  const setLocalPosition = (newPosition) => {
    set({pos:newPosition})
    
    if (isHittingRoom(newPosition, "room0")) {
      set({room: 'room-0'})
    }
    else if (isHittingRoom(newPosition, "room1")) {
      set({room: 'room-1'})
    }
    else if (isHittingRoom(newPosition, "room2")) {
      set({room: 'room-2'})
    }
    else if (isHittingRoom(newPosition, "room3")) {
      set({room: 'room-3'})
    }
    else if (isHittingRoom(newPosition, "room4")) {
      set({room: 'room-4'})
    }
    else if (isHittingRoom(newPosition, "seat1")) {
      set({room: 'seat-1'})
    }
    else if (isHittingRoom(newPosition, "seat2")) {
      set({room: 'seat-2'})
    }
    else if (isHittingRoom(newPosition, "seat3")) {
      set({room: 'seat-3'})
    }
    else if (isHittingRoom(newPosition, "seat4")) {
      set({room: 'seat-4'})
    }
    else if (isHittingRoom(newPosition, "seat5")) {
      set({room: 'seat-5'})
    }
    else if (isHittingRoom(newPosition, "seat6")) {
      set({room: 'seat-6'})
    }
    else if (isHittingRoom(newPosition, "seat7")) {
      set({room: 'seat-7'})
    }
    else if (isHittingRoom(newPosition, "seat8")) {
      set({room: 'seat-8'})
    }
    else if (isHittingRoom(newPosition, "seat9")) {
      set({room: 'seat-9'})
    }
    else if (isHittingRoom(newPosition, "seat10")) {
      set({room: 'seat-10'})
    }
    else if (isHittingRoom(newPosition, "seat11")) {
      set({room: 'seat-11'})
    }
    else if (isHittingRoom(newPosition, "seat12")) {
      set({room: 'seat-12'})
    }
    else if (isHittingRoom(newPosition, "seat13")) {
      set({room: 'seat-13'})
    }
    else if (isHittingRoom(newPosition, "seat14")) {
      set({room: 'seat-14'})
    }
    else if (isHittingRoom(newPosition, "seat15")) {
      set({room: 'seat-15'})
    }
    else if (isHittingRoom(newPosition, "seat16")) {
      set({room: 'seat-16'})
    }
    else if (isHittingRoom(newPosition, "seat17")) {
      set({room: 'seat-17'})
    }
    else if (isHittingRoom(newPosition, "seat18")) {
      set({room: 'seat-18'})
    }
    else if (isHittingRoom(newPosition, "seat19")) {
      set({room: 'seat-19'})
    }
    else if (isHittingRoom(newPosition, "seat20")) {
      set({room: 'seat-20'})
    }
    else if (isHittingRoom(newPosition, "seat21")) {
      set({room: 'seat-21'})
    }
    else if (isHittingRoom(newPosition, "seat22")) {
      set({room: 'seat-22'})
    }
    else if (isHittingRoom(newPosition, "seat23")) {
      set({room: 'seat-23'})
    }
    else if (isHittingRoom(newPosition, "seat24")) {
      set({room: 'seat-24'})
    }
    else if (isHittingRoom(newPosition, "seat25")) {
      set({room: 'seat-25'})
    }
    else if (isHittingRoom(newPosition, "speaker")) {
      set({room: 'speaker'})
    }
    else if (isHittingRoom(newPosition, "stage")) {
      set({room: 'stage'})
    }
    else {
      set({room: 'default'})
    }
  }
  
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
    // newState.audio?.dispose() //these throw errors on reconnection - some event handlers still leftover
    // newState.video?.dispose()
    newState.audio=undefined
    newState.video=undefined
  })

  const setMyID = (id:string) => set({id:id})

  const onPanChange = ({ scale, positionX, positionY }) => {
    const panPosition = {
      x: positionX,
      y: positionY
    }
    set({ scale: scale, pan: panPosition })
  }

  return {
  ...state,
  setLocalPosition,
  setLocalTracks,
  toggleMute,
  clearLocalTracks,
  setMyID,
  onPanChange
}
})

if (process.env.NODE_ENV === "development") {
  let root = document.createElement('div');
  root.id = 'simple-zustand-devtools-3';
  document.body.appendChild(root);

  mountStoreDevtool("LocalStore", useLocalStore, root)
}