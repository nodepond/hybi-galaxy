import React from 'react'
import Select from 'react-select'

type Props = {
  devices: any
  deviceSelect(deviceId): void
}

export const DeviceSelect: React.FC<Props> = (props) => {
  let options
  if (props.devices) {
    options = props.devices.map(device => {
      return { value: device.deviceId, label: device.label }
    })
  } else {
    options = [{ value: 'device.deviceId', label: 'device.label' }]
  }

  const onChange = (e) => {
    // console.log('onChange ', e)
    props.deviceSelect(e.value)
  }

  return (
    <>
      <Select options={options} onChange={onChange} />
    </>
  )
}
