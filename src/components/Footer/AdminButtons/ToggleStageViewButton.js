import React, { useCallback, useEffect } from 'react'
import { Button } from '../../common/Buttons/Button'
import { useLocalAdminStore } from '../../../store/LocalAdminStore'

export const ToggleStageViewButton = () => {
  const toggleStageView = useLocalAdminStore(store => store.toggleStageView)
  const embeddedStageView = useLocalAdminStore(store => store.embeddedStageView)

  useEffect(() => {
    console.log('embeddedStageView', embeddedStageView)
  }, [embeddedStageView])

  return (<Button type="secondary" onClick={toggleStageView}>Admin: Stage-Fenster wechseln</Button>)
}
