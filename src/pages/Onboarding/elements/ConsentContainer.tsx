import React, { useState } from 'react'
import { conferenceName } from '../../../components/JitsiConnection/jitsiOptions'
import { useConferenceStore } from '../../../store/ConferenceStore'
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
      history.push(`/session/bpp-1`)
    }
  }

  return (
    <>
      <div>Du möchtest zu unserer digitalen Bühne?<br />Dann schalte dein Mikrofon und deine Kamera ein.<br /><br />Alle können dich sehen: hier im Internet und auf der wirklichen Bühne.<br /><br />Wenn wir Fotos machen oder filmen dann sagen wir das vorher.
Bist Du einverstanden?<br />Dann klicke auf das kleine Feld und dann klicke auf den blauen Knopf.<br /><br /></div>
      <input type='checkbox' onChange={handleCheckbox} defaultChecked={consent} /> Ich bin einverstanden.<br /><br />
      <JoinButton name="joinButton" onClick={onSubmit}>Start</JoinButton><br /><br />
      {!consent && <div style={{color: 'red'}}>Bitte Datenschutzerklärung bestätigen.</div>}
    </>
  )
}
