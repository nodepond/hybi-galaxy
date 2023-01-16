// Read Me:
// These are Server Connection Options for the Jitsi library
// Best is to Keep them as a reference
// Just duplicate the file and name it serverConfig.ts to adjust to your likings

export const connectionOptions = {
  hosts: {
     domain: 'meet.jit.si',
     muc: 'conference.meet.jit.si', 
     focus: 'focus.meet.jit.si',
  }, 
  externalConnectUrl: 'https://meet.jit.si/http-pre-bind', 
  // enableP2P: true, 
  // p2p: { 
  //    enabled: true, 
  //    preferH264: true, 
  //    disableH264: true, 
  //    useStunTurn: true,
  // }, 
  // useStunTurn: true,
  bosh: `https://meet.jit.si/http-bind`, /* deprecated */
  serviceUrl: `//the-prdct.com/http-bind`,  /* use this instead of bosh-param */
  // websocket: 'wss://meet.jit.si/xmpp-websocket', 
  clientNode: 'http://jitsi.org/jitsimeet', 
}

export const stageConnectionOptions = {
  hosts: {
     domain: 'meet.jit.si',
     muc: 'conference.meet.jit.si', 
     focus: 'focus.meet.jit.si',
  }, 
  externalConnectUrl: 'https://meet.jit.si/http-pre-bind', 
  // bosh: `https://meet.jit.si/http-bind?room=chatmosphere1234`, /* deprecated */
  serviceUrl: `//server.com/http-bind`, /* use this instead of bosh-param */
  // websocket: 'wss://meet.jit.si/xmpp-websocket', 
  clientNode: 'http://jitsi.org/jitsimeet', 
}