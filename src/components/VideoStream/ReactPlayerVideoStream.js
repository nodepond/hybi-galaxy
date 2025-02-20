import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'

const PLAYBACK_URL = process.env.REACT_APP_LIVE_STREAM_URL;

const videoStyle = {
  display: 'flex',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  objectFit: 'fill'
}

const fullscreenButtonStyle = {
  position: 'absolute',
  right: '0',
  bottom: '0',
  background: 'red'
};

class ReactPlayerVideoStream extends Component {
  constructor(props) {
    super(props)
    this.videoRef = React.createRef()
  }

  render() {
    return (
      <>
      <ReactPlayer
        id='VideoStream'
        playing={true}
        style={videoStyle}
        width='100%'
        height='100%'
        url={PLAYBACK_URL}
        ref={(video) => { this.videoRef = video }}
        onClick={() => {
          if (screenfull.isEnabled) {
            screenfull.request(this.videoRef.wrapper)
          }
        }}
        >
      </ReactPlayer>
      {/* <button 
            style={fullscreenButtonStyle}
            onClick={() => {
              if (screenfull.isEnabled) {
                screenfull.request(this.videoRef.wrapper)
              }
            }}
          >Fullscreen</button> */}
      </>
    )
  }
}

export default ReactPlayerVideoStream;