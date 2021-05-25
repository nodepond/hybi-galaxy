import React, { useCallback } from 'react';
import { Button } from '../../common/Buttons/Button';
import { useLocalStore } from '../../../store/LocalStore';
import { panOptions } from '../../PanWrapper/panOptions'

export const ToStageButton = () => {

  const pan = useLocalStore(store => store.pan)
  const scale = useLocalStore(store => store.scale)
  const panChange = useLocalStore(store => store.onPanChange)
  const setLocalPosition = useLocalStore(store => store.setLocalPosition)

  const onStageButtonPressed = () => {
    console.log('here')
    // TODO: updates store, but the TransformWrapper seem to stay unaffected..
		panChange({
      scale: 0.3,
      positionX: -226,
      positionY: -840
    })
    setLocalPosition(panOptions.user.initialPosition)
	}

  return <Button onClick={onStageButtonPressed}>TO STAGE BUTTON</Button>
}