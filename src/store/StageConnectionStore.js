// This is used as connection store for connecting to the "stage cam"
import create from 'zustand'
import { stageConnectionConfig } from '../../src/serverConfig'

const initOptions = {
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

export const useStageConnectionStore = create((set, get) => {
  const initialState = {
    serverUrl: "the-prdct.com",
    jsMeet: undefined,
    room: null,
    connection: undefined,
    connected: false,
    error: undefined
  }

  // # Private Functions
  const _setConnected = () => set({ connected: true, error: undefined }) // actually this should initiate a new conference object without joining it
  const _setDisconnected = () => set({ connected: false })
  let jitsiMeetPromise

  // # Public Functions
  const initJitsiMeet = async () => {
    const jsMeet = get().jsMeet
    console.log('stage jsMeet already present', jsMeet)
    if (jsMeet) return jsMeet

    // not sure if most elegant but now returns jitsi object and we can initialize conference nicely after server
    jitsiMeetPromise = new Promise((resolve, reject) => {
      const jitsiMeet = async () => window.JitsiMeetJS
      jitsiMeet().then((jsMeet) => {
        jsMeet.setLogLevel(jsMeet.logLevels.ERROR)
        jsMeet.init(initOptions)
        set({ jsMeet: jsMeet })
        console.log('stage jsMeet', jsMeet)
        // get().connectServer()
        resolve(jsMeet)
      }).catch(err => {
        reject(err)
      })
    })
    return await jitsiMeetPromise
  }
  // const refreshLocalDevices = async () => {
  //   await initJitsiMeet().then(jsMeet => {
  //     jsMeet.mediaDevices.enumerateDevices((devices) => {
  //       const audioDevices = devices.filter(device => {
  //         return device.kind === 'audioinput'
  //       })
  //       jsMeet.audioDevices = audioDevices
  //     })
  //   })
  //   await initJitsiMeet().then(jsMeet => {
  //     jsMeet.mediaDevices.enumerateDevices((devices) => {
  //       const videoDevices = devices.filter(device => {
  //         return device.kind === 'videoinput'
  //       })
  //       jsMeet.videoDevices = videoDevices
  //     })
  //   })
  //   await initJitsiMeet().then(jsMeet => {
  //     jsMeet.mediaDevices.enumerateDevices((devices) => {
  //       const audioOutputDevices = devices.filter(device => {
  //         return device.kind === 'audiooutput'
  //       })
  //       jsMeet.audioOutputDevices = audioOutputDevices
  //     })
  //   })
  // }
  // const init = async (conferenceID) => {
  //   const JitsiMeetJS = await initJitsiMeet()
  //   const connection = useConnectionStore.getState().connection //either move to ConnectionStore or handle undefined here

  //   const conferenceName = 'bpp-stage'

  //   // console.log("init:",connection ,JitsiMeetJS , conferenceName,useConnectionStore.getState().connected,conferenceID)

  //   if(connection && JitsiMeetJS && conferenceName) {
  //     const conference = connection.initJitsiConference(conferenceName, conferenceOptions) //TODO before unload close connection
  //     conference.on(JitsiMeetJS.events.conference.USER_JOINED, _addUser)
  //     conference.on(JitsiMeetJS.events.conference.USER_LEFT, _removeUser)
  //     conference.on(JitsiMeetJS.events.conference.TRACK_ADDED, _onRemoteTrackAdded)
  //     conference.on(JitsiMeetJS.events.conference.TRACK_REMOVED, _onRemoteTrackRemoved)
  //     conference.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, _onConferenceJoined)
  //     conference.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, _onTrackMuteChanged);
  //     conference.on(JitsiMeetJS.events.conference.CONFERENCE_ERROR, _onConferenceError);
  //     //conference.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, onUserNameChanged);
  //     // conference.on(JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED, on_remote_track_audio_level_changed);
  //     //conference.on(JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED, onPhoneNumberChanged);
  //     conference.addCommandListener("pos", _onPositionReceived)
  //     conference.addCommandListener("room", _onRoomReceived)
  //     // r.on(JitsiMeetJS.events.conference.PARTICIPANT_PROPERTY_CHANGED, (e) => console.log("Property Changed ", e))
  //     window.addEventListener('beforeunload', leave) //does this help?  
  //     window.addEventListener('unload', leave) //does this help?
  //     conference.join()
  //     set({conferenceObject:conference,error:undefined})
  //   } else {
  //     throw new Error('Jitsi Server connection has not been initialized or failed :( - did you call initJitsiMeet on ConnectionStore yet?')
  //   }
  // }

  const connectServer = () => {
    // Since jsMeet object is async (Promise), we should use also Promise to create a connection and connect. Because this is depandent to jsMeet object
    // But this function should be called only once if there is a current connection object.
    const connection = get().connection
    if (connection) {
      // It might be that the object is created but the connection failed. Try again, until we handle the errors better.
      // if (!get().connected) connection.connect()
      return
    }
    // else savely init connection
    jitsiMeetPromise.then((jsMeet) => {
      const stageConnection = new jsMeet.JitsiConnection(
        null,
        null,
        stageConnectionConfig,
      ) // should be callable to init new connection to different servers
      stageConnection.addEventListener(
        jsMeet.events.connection.CONNECTION_ESTABLISHED,
        (e) => {
          console.log("stageConnection CONNECTION_ESTABLISHED:", e)
          // set({ connection: undefined, error: stageConnection.xmpp.lastErrorMsg })
        },
        // _setConnected,
      )
      stageConnection.addEventListener(
        jsMeet.events.connection.CONNECTION_FAILED,
        (e) => {
          console.log("stageConnection:", stageConnection.xmpp.lastErrorMsg)
          console.log("stageConnection:", get().connection)
          set({ connection: undefined, error: stageConnection.xmpp.lastErrorMsg })
        },
      )
      stageConnection.addEventListener(
        jsMeet.events.connection.CONNECTION_DISCONNECTED,
        _setDisconnected,
      )
      stageConnection.connect()
      set({ connection: stageConnection, error: undefined })
    })
  }

  return {
    ...initialState,
    initJitsiMeet,
    connectServer,
    disconnectServer: () => {
      get().connection?.disconnect()
      set({ connection: undefined })
    },
    setConnected: () => set({ connected: true }), // actually this should initiate a new conference object without joining it
    setDisconnected: () => set({ connected: false }),
  }
})
