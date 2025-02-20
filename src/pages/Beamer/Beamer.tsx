import React from 'react'
import { ErrorHandler } from '../../components/common/Info/ErrorHandler'
import { Info } from '../../components/common/Info/Info'

import { Header } from '../../components/Header/Header'
import JitsiConnection from '../../components/JitsiConnection/JitsiConnection'
import { BeamerUsers } from '../../components/User/BeamerUsers'
import { LocalBeamerStoreLogic } from '../../store/LocalBeamerStoreLogic'

export const Beamer = () => {
  return (
    <React.Fragment>
      <ErrorHandler />
      <Info>
        Hybi-Galaxy Beamer-View
      </Info>
      <JitsiConnection />
      <LocalBeamerStoreLogic />
      <BeamerUsers />
    </React.Fragment>
  )
}
