import React, { Component } from 'react'
import styled from 'styled-components';

const REACT_APP_ANNOUNCEMENT_HEADLINE = process.env.REACT_APP_ANNOUNCEMENT_HEADLINE
const REACT_APP_ANNOUNCEMENT_EMBED_VIDEO_URL = process.env.REACT_APP_ANNOUNCEMENT_EMBED_VIDEO_URL
const REACT_APP_ANNOUNCEMENT_TEXT = process.env.REACT_APP_ANNOUNCEMENT_TEXT

const AnnoucementVideoFrame = styled.iframe`
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  objectFit: fill;
`

const CustomH1 = styled.h1`
  text-align: left;
`

const CustomText = styled.p`
  font-size: 24px;
  text-align: left;
`

const CustomLink = styled.a`
  pointer: cursor;
`

class Annoucement extends Component {
  constructor(props) {
    super(props)
    this.videoRef = React.createRef()
  }

  render() {
    return (
      <>
        <CustomH1>{REACT_APP_ANNOUNCEMENT_HEADLINE}</CustomH1>
        <AnnoucementVideoFrame
          src={REACT_APP_ANNOUNCEMENT_EMBED_VIDEO_URL} allow="accelerometer; clipboard-write; encrypted-media; gyroscope;" allowFullScreen
          >
        </AnnoucementVideoFrame>
        <CustomText>
          {REACT_APP_ANNOUNCEMENT_TEXT}
        </CustomText>
      </>
    )
  }
}

export default Annoucement;