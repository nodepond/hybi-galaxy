import React, { useEffect, useRef } from 'react'
 
const AudioPlayer = ({soundfile, play = false, volume = 1.0, loop = false}) => {
  const audioRef = useRef();

  // use Audio constructor to create HTMLAudioElement
  // const audioTune = new Audio(soundfile)
 
  // load audio file on component load
  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])
 
  // set the loop of audio tune
  useEffect(() => {
    audioRef.current.loop = loop
  }, [loop])

  useEffect(() => {
    console.log('play', play)
    if (play === true) {
      audioRef.current.play()
    } else {
      console.log('play pause')
      audioRef.current.pause()
    }
  }, [play])
 
  // stop audio sound
  // const stopSound = () => {
  //   audioTune.pause()
  //   audioTune.currentTime = 0
  // }
 
  return (
    <audio
      autoPlay={false}
      ref={audioRef}
      src={soundfile}
    />
  )
}
 
export default AudioPlayer
