// SETTINGS - these are Connection and Room Options for the Jitsi lib

import { PropsList } from "react-zoom-pan-pinch/dist/store/interfaces/propsInterface"

export interface IJitsiInitOptions {
  disableAudioLevels?: boolean
  disableSimulcast?: boolean
  useIPv6?: boolean
  enableWindowOnErrorHandler?: boolean
  disableThirdPartyRequests?: boolean
  enableAnalyticsLogging?: boolean
  preferredCodec?: string
  disabledCodec?: string
  preferH264?: boolean //deprecated
}

// -------------------------

export const conferenceName = process.env.REACT_APP_DEMO_SESSION || "boatpeopleproject"

export const conferenceOptions = {
  openBridgeChannel: false, //what is this doing?
}

export const jitsiInitOptions:IJitsiInitOptions = {
  disableAudioLevels: false,
  preferredCodec: 'H264',
  disabledCodec: 'VP8',
  disableSimulcast: false,
  preferH264: true,
  // // useIPv6:true, // can be off
  // enableWindowOnErrorHandler: false,
  // disableThirdPartyRequests: false,
  // enableAnalyticsLogging: true
}

export const localTrackOptions = {
  devices: ["audio", "video"],
  resolution: 480,
  minFps: 15,
  maxFps: 15,
  constraints: {
    video: {
      height: {
        ideal: 360,
        max: 360,
        min: 240,
      },
      frameRate: {
        max: 15,
      },
    },
  },
  // room: { size: { x: 6000, y: 6000 } },
  // get user() {
  //   return {
  //     //center the room
  //     initialPosition: { x: this.room.size.x / 2, y: this.room.size.y / 2 },
  //     size: { x: 200, y: 200 },
  //   }
  // },
}

export const getConnectionOptions = (): object => {
  let serverConfig: any = {}
  try {
    serverConfig = require("./../../serverConfig")
  } catch (e) {
    serverConfig = require("./../../serverConfig-example")
  }

  return serverConfig.connectionOptions
}

// export const transformWrapperOptions: PropsList = {
//   wheel: { step: 50 },
//   scale: 1,
//   //center the window, considering the size of the user view
//   defaultPositionX: -localTrackOptions.user.initialPosition.x+(window.innerWidth-localTrackOptions.user.size.x)/2,
//   defaultPositionY: -localTrackOptions.user.initialPosition.y+(window.innerHeight-localTrackOptions.user.size.y)/2,
//   positionX: 0,
//   positionY: 0,
//   options: {
//     centerContent: false,
//     limitToBounds: true,
//     limitToWrapper: true,
//     minScale: 0.2,
//     // maxPositionX:10000, maxPositionY:10000,
//     // minPositionX:0, minPositionY:0
//   },
//   // scalePadding:{animationTime:10},
//   pan: { velocityEqualToMove: true },
//   pinch: { disabled: true },
// }
