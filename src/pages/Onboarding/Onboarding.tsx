import React from 'react'
import styled from 'styled-components'
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
  return (
    <React.Fragment>
      <Info>
        Onboarding
      </Info>
      <CenterContainer>
        <BigHeadContainer>
          <Wave />
          <BigHeadline>Willkommen in der Hybi-Galaxie</BigHeadline>
        </BigHeadContainer>
        <SubHeadline>Das hybride Theater-Foyer vom boat people projekt</SubHeadline>
        <FormContainer>
          <ConsentContainer />
        </FormContainer>
      </CenterContainer>
      <Footer />
    </React.Fragment>
  )
}
