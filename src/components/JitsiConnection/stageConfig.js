import stageConnectionConfig from "../../serverConfig"

// TODO: customize to stage-settings
export const conferenceName = "stage"

export const conferenceOptions = {
  openBridgeChannel: false, // what is this doing?
}

export const jitsiInitOptions = {
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
      // frameRate: {
      //   max: 15,
      // },
    },
  }
}

export const getConnectionOptions = () => {
  return stageConnectionOptions
}
