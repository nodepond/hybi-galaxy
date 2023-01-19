import React, { useState } from 'react'
import { conferenceName } from '../../../components/JitsiConnection/jitsiOptions'
import { useConferenceStore } from '../../../store/ConferenceStore'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import sponsorKulturgemeinschaften from '../../../assets/supporters/02_KULTUR_GEMEINSCHAFTEN_Logo.svg'
import sponsorBkm from '../../../assets/supporters/BKM_2017_WebSVG_de.svg'
import sponsorNeustartKultur from '../../../assets/supporters/CDR_BKM_Neustart_Kultur_Wortmarke_neg_RGB_RZ.svg'
import sponsorKsl from '../../../assets/supporters/KSL-Logo-RGB-schwarz.png'

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
const SupporterContainer = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const Supporter = styled.img`
  height: 75px;
  padding: 20px;
  cursor: pointer;
`

export const ConsentContainer = () => {
  const [consent, setConsent] = useState <boolean>(false)
  const history = useHistory()

  const handleCheckbox = (e) => {
    setConsent(e.target.checked)
  }

  const onSubmit = (e) => {
    e.preventDefault()
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
      <SupporterContainer>
        Gefördert von
        <a href="https://www.kulturstaatsministerin.de" target="_blank" rel="nofollow"><Supporter src={sponsorBkm} alt="Die Beauftragte der Bundesregierung für Kultur und Medien"></Supporter></a>
        <a href="https://www.neustartkultur.de" target="_blank" rel="nofollow"><Supporter src={sponsorNeustartKultur} alt="Neu Start Kultur" ></Supporter></a>
        <a href="https://www.kulturstiftung.de" target="_blank" rel="nofollow"><Supporter src={sponsorKsl} alt="Kulturstiftung der Länder"></Supporter></a>
        <a href="http://kulturgemeinschaften.de" target="_blank" rel="nofollow"><Supporter src={sponsorKulturgemeinschaften} alt="Kulturgemeinschaften"></Supporter></a>
      </SupporterContainer>
    </>
  )
}
