import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import styled from 'styled-components';

const REACT_APP_JITSI_STREAM_URL = process.env.REACT_APP_JITSI_STREAM_URL

const StageFrame = styled.iframe`
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  objectFit: fill;
  pointer-events: none;
`

const fullscreenButtonStyle = {
  position: 'absolute',
  right: '0',
  bottom: '0',
  background: 'red'
};

class JistiStageVideoStream extends Component {
  constructor(props) {
    super(props)
    this.videoRef = React.createRef()
  }

  render() {
    return (
      <>
        <StageFrame
          src={REACT_APP_JITSI_STREAM_URL} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" allowFullScreen
          >
        </StageFrame>
      </>
    )
  }
}

export default JistiStageVideoStream;