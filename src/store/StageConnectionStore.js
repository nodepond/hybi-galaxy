// This is used as connection store for connecting to the "stage cam"
import create from 'zustand'
import produce, { current } from 'immer'
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
    if (jsMeet) return jsMeet

    // not sure if most elegant but now returns jitsi object and we can initialize conference nicely after server
    jitsiMeetPromise = new Promise((resolve, reject) => {
      const jitsiMeet = async () => window.JitsiMeetJS
      jitsiMeet().then((jsMeet) => {
        jsMeet.setLogLevel(jsMeet.logLevels.ERROR)
        jsMeet.init(initOptions)
        set({ jsMeet: jsMeet })
        // get().connectServer()
        resolve(jsMeet)
      }).catch(err => {
        reject(err)
      })
    })
    return await jitsiMeetPromise
  }

  const _onConferenceJoined = () => {
    console.log('_onStageConferenceJoined')
  }
  const _addUser = (id, user) => {
    if (user?._displayName?.toLowerCase() === 'stage') {
      set({ stageUserId: user._id})
    }
    set(produce( draft => { draft.users.push(user) }))
    console.log('_addUser get().users', get().users)
  }
  const _removeUser = (id) => {
    console.log('_removeUser', id)
    set(produce( draft => { draft.users = draft.users.filter(user => {
      return user._id !== id
    }) }))
    console.log("_removeUser get().users", get().users)
  }
  const _onRemoteTrackAdded = (track) => {
    console.log('_onRemoteTrackAdded', track)
    if (track.isLocal()) return
    if (track.ownerEndpointId === get().stageUserId) {
      set(produce( draft => { draft.tracks.push(track) }))
    }
    // const id = track.getParticipantId() // get user id of track
    // track.getType() === "audio" ? _addAudioTrack(id, track) : _addVideoTrack(id, track)
    console.log("_onRemoteTrackAdded get().tracks", get().tracks)
  }
  const _onRemoteTrackRemoved = (track) => {
    console.log("_onRemoteTrackRemoved", track)
    set(produce( draft => { draft.tracks = draft.tracks.filter(currentTrack => {
      return currentTrack.track.id !== track.track.id
    }) }))
    track.dispose()
    console.log("_onRemoteTrackRemoved get().tracks", get().tracks)
  }

  const connectServer = (room) => {
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
          // e is just a unique id
          _setConnected()
          const conference = stageConnection.initJitsiConference(room, {})
          conference.on(jsMeet.events.conference.USER_JOINED, _addUser)
          conference.on(jsMeet.events.conference.USER_LEFT, _removeUser)
          conference.on(jsMeet.events.conference.TRACK_ADDED, _onRemoteTrackAdded)
          conference.on(jsMeet.events.conference.TRACK_REMOVED, _onRemoteTrackRemoved)
          conference.on(jsMeet.events.conference.CONFERENCE_JOINED, _onConferenceJoined)
          conference.join()
          set({ conference: conference })
        }
      )
      stageConnection.addEventListener(
        jsMeet.events.connection.CONNECTION_FAILED,
        (e) => {
          console.log("stageConnection:", stageConnection.xmpp.lastErrorMsg)
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
    stageUserId: '',
    users: [],
    tracks: []
  }
})
