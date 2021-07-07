import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import styled from 'styled-components';

const PLAYBACK_URL = process.env.REACT_APP_LIVE_STREAM_URL

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
        src="https://the-prdct.com/bpp-stage" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
        >
      </StageFrame>
      </>
    )
  }
}

export default JistiStageVideoStream;