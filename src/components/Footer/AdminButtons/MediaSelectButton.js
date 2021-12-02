import React, { useCallback, useEffect } from 'react'
import { Button } from '../../common/Buttons/Button'
import { useLocalStore } from '../../../store/LocalStore'

export const MediaSelectButton = () => {
  const showMediaselect = useLocalStore(store => store.showMediaselect)
  const toggleMediaselect = useLocalStore(store => store.toggleMediaselect)

  useEffect(() => {
    console.log('showMediaselect', showMediaselect)
  }, [showMediaselect])

  return (<Button type="secondary" onClick={toggleMediaselect}>Audio / Video</Button>)
}
