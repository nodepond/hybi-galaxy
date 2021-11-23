import React from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { ConsentContainer } from './elements/ConsentContainer'
import { ReactComponent as Wave } from './../../assets/wave.svg'
import { Footer } from '../../components/Footer/Footer'
import { BigHeadline } from './../../components/common/BigHeadline'
import { SubHeadline } from '../../components/common/SubHeadline'
import { Info } from '../../components/common/Info/Info'

const BigHeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

const FormContainer = styled.div`
  margin-top: 40px;
`

export const Onboarding = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  return (
    <React.Fragment>
      <CenterContainer>
        <BigHeadContainer>
          <Wave />
          <BigHeadline>Willkommen in der Hybi-Galaxy</BigHeadline>
        </BigHeadContainer>
        <SubHeadline>Das hybride Theater-Foyer vom boat people projekt</SubHeadline>
        {isDesktopOrLaptop &&
          <FormContainer>
            <ConsentContainer />
          </FormContainer>}
        {!isDesktopOrLaptop &&
          <SubHeadline><br /><br /><br />Das Foyer funktioniert leider nicht auf Mobiltelefon oder Tablet. Bitte öffnen Sie die Seite auf einem Laptop oder dem Computer.</SubHeadline>}
      </CenterContainer>
      <Footer />
    </React.Fragment>
  )
}
