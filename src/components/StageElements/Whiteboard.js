import React, { Component } from 'react'
import styled from 'styled-components';

const REACT_APP_WHITEBOARD_URL = process.env.REACT_APP_WHITEBOARD_URL

const WhiteboardFrame = styled.iframe`
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  objectFit: fill;
`

class Whiteboard extends Component {
  constructor(props) {
    super(props)
    this.videoRef = React.createRef()
  }

  render() {
    return (
      <>
        <WhiteboardFrame
          src={REACT_APP_WHITEBOARD_URL} allow="accelerometer; clipboard-write; encrypted-media; gyroscope;" allowFullScreen
          >
        </WhiteboardFrame>
      </>
    )
  }
}

export default Whiteboard;