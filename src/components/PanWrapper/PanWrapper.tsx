import React, { useCallback, useEffect } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useLocalStore } from "./../../store/LocalStore"
import { panOptions, transformWrapperOptions} from './panOptions'
import {throttle} from 'lodash'

const panChange = store => store.onPanChange
const setPos = store => store.setLocalPosition

export const PanWrapper = ({children}) => {

  const onPanChange = useLocalStore(panChange)
  const setLocalPosition = useLocalStore(setPos)

  // for whatever reson that transform to point does not work properly...
  const transformData = {
    positionX: -226, 
    positionY: -840,
    scale: 0.4,
    animationTime: 0.2,
    animationType: 'easeOut'
  }
  
  // const throttlePan = useCallback(throttle(onPanChange, 200),[])
  // const throttleSendPos = useCallback(throttle(setLocalPosition, 200),[])
  
  useEffect(() => {
    onPanChange({scale:transformWrapperOptions.scale,positionX:transformWrapperOptions.defaultPositionX,positionY:transformWrapperOptions.defaultPositionY})
    setLocalPosition(panOptions.user.initialPosition)
    // throttlePan({scale:transformWrapperOptions.scale,positionX:transformWrapperOptions.defaultPositionX,positionY:transformWrapperOptions.defaultPositionY})
    // throttleSendPos(panOptions.user.initialPosition)
  },[])

  return (
    <TransformWrapper 
      {...transformWrapperOptions}
      onZoomChange={onPanChange}
      onPanning={onPanChange}
      onPinchingStop={onPanChange}
    >
      {({ zoomIn, zoomOut, resetTransform, setTransform, ...rest }) => (
          <React.Fragment>
            <div className="tools">
              <button onClick={zoomIn}>+</button>
              <button onClick={zoomOut}>-</button>
              {/* <button onClick={() => setTransform(transformData)}>x</button> */}
            </div>
      <TransformComponent>
        {children}
      </TransformComponent>
      </React.Fragment>)}
    </TransformWrapper>
  )
}