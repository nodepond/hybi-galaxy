import React, { useState } from 'react'
import { conferenceName } from '../../../components/JitsiConnection/jitsiOptions'
import { useConferenceStore } from '../../../store/ConferenceStore'
import { NameInputForm } from './NameInputForm'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const JoinButton = styled.button`
  height: 50px;
  background: ${props => props.theme.primary['2']};
  border-radius: 0 ${props => props.theme.radius} ${props => props.theme.radius} 0;
  width: 111px;
  color: ${props => props.theme.base['6']};
  font-size: 1rem;
  border: none;
  &:hover {
    background-color: ${props => props.theme.primary['3']};
  }
`

export const ConsentContainer = () => {
  const [consent, setConsent] = useState <boolean>(false)
  const history = useHistory()

  const handleCheckbox = (e) => {
    setConsent(e.target.checked)
    console.log('consent e...', e)
    console.log('consent...', consent)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(consent)
    if (!consent) {
    } else {
      history.push(`/session/bpp`)
    }
  }

  return (
    <>
      <div>Um unsere digitale Bühne zu betreten, musst Du dein Mikrofon und deine Kamera eischalten.<br />Deine Stimme und Dein Bild wird im digitalen und analogen Raum zu sehen sein.<br />Sie werden nur im Rahmen dieser Veranstaltung verwendet. Wenn wir den Videostream aufzeichen, wirst Du extra darauf hingewiesen.<br /><br />Wenn Du damit einverstanden bist, setze in dem kleinen Kästchen ein Haken und drücke dann den blauen Knopf.</div>
      {!consent && <div style={{color: 'red'}}>Bitte Datenschutzerklärung bestätigen.</div>}
      <input type='checkbox' onChange={handleCheckbox} defaultChecked={consent} /> Ich bin einverstanden.
      <JoinButton name="joinButton" onClick={onSubmit}>Start</JoinButton>
    </>
  )
}
