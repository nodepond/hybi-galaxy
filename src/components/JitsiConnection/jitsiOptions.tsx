// TODO: Can we ged rid of this file and manage the option in a different way? Looks like totally useless overhead for me....
// SETTINGS - these are Connection and Room Options for the Jitsi lib
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
  stereo: true,
  p2p: { enabled: false }
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
