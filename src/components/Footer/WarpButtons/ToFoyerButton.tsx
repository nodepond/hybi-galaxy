import React, { useCallback } from 'react';
import { Button } from '../../common/Buttons/Button';
import { useLocalStore } from '../../../store/LocalStore';
import { panOptions } from '../../PanWrapper/panOptions'

export const ToFoyerButton = () => {

  const pan = useLocalStore(store => store.pan)
  const scale = useLocalStore(store => store.scale)
  const panChange = useLocalStore(store => store.onPanChange)
  const setLocalPosition = useLocalStore(store => store.setLocalPosition)

  const onFoyerButtonPressed = () => {
    // TODO: updates store, but the TransformWrapper seem to stay unaffected..
		panChange({
      scale: 0.3,
      positionX: -126,
      positionY: -440
    })
    setLocalPosition(panOptions.user.initialPosition)
	}

  return <Button onClick={onFoyerButtonPressed}>TO FOYER BUTTON</Button>
}