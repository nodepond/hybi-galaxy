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
  const pan = useLocalStore(store => store.pan)
  const scale = useLocalStore(store => store.scale)

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
  
  // useEffect(() => {
  //   onPanChange({scale:transformWrapperOptions.scale,positionX:transformWrapperOptions.defaultPositionX,positionY:transformWrapperOptions.defaultPositionY})
  //   setLocalPosition(panOptions.user.initialPosition)
  //   // throttlePan({scale:transformWrapperOptions.scale,positionX:transformWrapperOptions.defaultPositionX,positionY:transformWrapperOptions.defaultPositionY})
  //   // throttleSendPos(panOptions.user.initialPosition)
  // },[])

  return (
    <TransformWrapper 
      // {...transformWrapperOptions}
      onPanning={(e) => {
        console.log('onPanning',e)
        onPanChange(e.state)
      }}
      onZoom={(e) => {
        console.log('onZoom',e)
        onPanChange(e.state)
      }}
      // onPinchingStop={onPanChange}
      centerOnInit={true}
      limitToBounds={false}
      // limitToWrapper={false}
      minScale={0.1}
      maxScale={3}
      initialScale={0.3}
      initialPositionX={-600 * 0.3 + 500}
      initialPositionY={-3700 * 0.3 + 500}
    >
      {({ zoomIn, zoomOut, zoomToElement, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <button onClick={() => zoomIn(0.5)}>+</button>
            <button onClick={() => zoomOut(0.5)}>-</button>
            <button onClick={() => {
              zoomToElement('FoyerView', 1500)
              const x = 1756 + (Math.random()-0.5) * 200
              const y = 3326 + (Math.random()-0.5) * 200
              document.getElementById('DragElement')?.setAttribute('style', `transform:translate(${x}px, ${y}px);`)
              setLocalPosition({ x: x, y: y})
            }}>Foyer</button>
            <button onClick={() => {
              zoomToElement('LiveStreamView', 1500)
              const x = 4256 + (Math.random()-0.5) * 200
              const y = 26 + (Math.random()-0.5) * 200
              document.getElementById('DragElement')?.setAttribute('style', `transform:translate(${x}px, ${y}px);`)
              setLocalPosition({ x: x, y: y})
            }}>Stage</button>
          </div>
          <TransformComponent>
            {children}
          </TransformComponent>
        </React.Fragment>)}
    </TransformWrapper>
  )
}