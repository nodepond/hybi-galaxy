import React, { useState } from 'react'
import { conferenceName } from '../../../components/JitsiConnection/jitsiOptions'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import Select from 'react-select'

type Props = { audioSelect(device): void }

export const AudioSelect: React.FC<Props> = (props) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const onChange = (e) => {
    console.log('onChange ', e)
    props.audioSelect(e.value)
  }

  return (
    <>
      <div>AUDIOSELECT</div>
      <Select options={options} onChange={onChange} />
    </>
  )
}
