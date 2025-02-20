import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import * as config from '../../config';
import styled from 'styled-components';

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

class AmazonIVSVideoStream extends Component {
  constructor() {
    super ();
    this.state = {
      maxMetaData: 10,
      metaData: [],
    }
  }

  componentDidMount() {
    const mediaPlayerScript = document.createElement("script");
    mediaPlayerScript.src = "https://player.live-video.net/1.3.1/amazon-ivs-player.min.js";
    mediaPlayerScript.async = true;
    mediaPlayerScript.onload = () => this.mediaPlayerScriptLoaded();
    document.body.appendChild(mediaPlayerScript);
  }

  mediaPlayerScriptLoaded = () => {
    // This shows how to include the Amazon IVS Player with a script tag from our CDN
    // If self hosting, you may not be able to use the create() method since it requires
    // that file names do not change and are all hosted from the same directory.

    const MediaPlayerPackage = window.IVSPlayer;

    // First, check if the browser supports the Amazon IVS player.
    if (!MediaPlayerPackage.isPlayerSupported) {
        console.warn("The current browser does not support the Amazon IVS player.");
        return;
    }

    const PlayerState = MediaPlayerPackage.PlayerState;
    const PlayerEventType = MediaPlayerPackage.PlayerEventType;

    // Initialize player
    const player = MediaPlayerPackage.create();
    player.attachHTMLVideoElement(document.getElementById("video-player"));

    // Attach event listeners
    player.addEventListener(PlayerState.PLAYING, () => {
        console.log("Player State - PLAYING");
    });
    player.addEventListener(PlayerState.ENDED, () => {
        console.log("Player State - ENDED");
    });
    player.addEventListener(PlayerState.READY, () => {
        console.log("Player State - READY");
    });
    player.addEventListener(PlayerEventType.ERROR, (err) => {
        console.warn("Player Event - ERROR:", err);
    });
    player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
        console.log('Timed metadata: ', cue.text);
        const metadataText = JSON.parse(cue.text);
        const productId = metadataText['productId'];
        this.props.setMetadataId(productId);
        const metadataTime = player.getPosition().toFixed(2);

        const { metaData, maxMetaData } = this.state;
        // only keep max 5 metadata records
        if (metaData.length > maxMetaData) {
          metaData.length = maxMetaData;
        }
        // insert new metadata
        metaData.unshift(`productId: ${productId} (${metadataTime}s)`);
        this.setState({ metaData });
    });

    // Setup stream and play
    player.setAutoplay(true);
    player.load(PLAYBACK_URL);
    player.setVolume(0.5);

    // save reference to player. Call it with i.e. window.player.setVolume(1)
    window.player = player
  }

  render() {
    return (
      <div className="player-wrapper">
        <div className="aspect-169 pos-relative full-width full-height">
          <VideoView id="video-player" className="video-elem pos-absolute full-width" playsInline></VideoView>
        </div>
      </div>
    )
  }
}

AmazonIVSVideoStream.propTypes = {
  setMetadataId: PropTypes.func,
  videoStream: PropTypes.string,
};

export default AmazonIVSVideoStream;