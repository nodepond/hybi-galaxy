import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types';
// import * as config from '../../config';
import ReactPlayer from 'react-player'
import styled from 'styled-components';
import screenfull from 'screenfull'

const PLAYBACK_URL = process.env.REACT_APP_LIVE_STREAM_URL;

const VideoView = styled.video`
  display:flex;
  background: red;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
`

const videoStyle = {
  display: 'flex',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  objectFit: 'fill'
};

class ReactPlayerVideoStream extends Component {
  constructor() {
    super ();
    this.state = {
      maxMetaData: 10,
      metaData: [],
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <ReactPlayer 
        style={videoStyle}
        width='100%'
        height='100%'
        url={PLAYBACK_URL}
        onClick={() => {
          console.log('click click')
          screenfull.request(findDOMNode(this))
        }}>
      </ReactPlayer>
    )
  }
}

export default ReactPlayerVideoStream;