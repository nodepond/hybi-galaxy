import React, { useRef } from "react"
import { TransformComponent, TransformWrapper, ReactZoomPanPinchRef } from "react-zoom-pan-pinch"
import { useLocalStore } from "./../../store/LocalStore"

const panChange = store => store.onPanChange
const setPos = store => store.setLocalPosition

export const PanWrapper = ({children}) => {
  const transformRef = useRef<ReactZoomPanPinchRef>(null)
  const onPanChange = useLocalStore(panChange)
  const setLocalPosition = useLocalStore(setPos)

  return (
    <TransformWrapper 
      ref={transformRef}
      onInit={(e) => {
        onPanChange(e.state)
      }}
      onPanning={(e) => {
        onPanChange(e.state)
      }}
      onPanningStop={(e) => {
        onPanChange(e.state)
      }}
      onZoom={(e) => {
        onPanChange(e.state)
      }}
      onZoomStop={(e) => {
        onPanChange(e.state)
      }}
      centerOnInit={true}
      limitToBounds={false}
      minScale={0.1}
      maxScale={3}
      initialScale={0.3}
      initialPositionX={-600 * 0.3 + 500}
      initialPositionY={-3700 * 0.3 + 500}
    >
      {({ zoomIn, zoomOut, zoomToElement, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <button onClick={() => { 
              zoomIn(0.5)
              setInterval(() => {
                onPanChange(transformRef.current?.state)
              }, 300)
            }}>+</button>
            <button onClick={() => { 
              zoomOut(0.5)
              setInterval(() => {
                onPanChange(transformRef.current?.state)
              }, 300)
            }}>-</button>
            <button onClick={() => {
              zoomToElement('FoyerView', 1500)
              const x = 1756 + (Math.random()-0.5) * 200
              const y = 3326 + (Math.random()-0.5) * 200
              document.getElementById('DragElement')?.setAttribute('style', `transform:translate(${x}px, ${y}px);`)
              setTimeout(() => {
                onPanChange(transformRef.current?.state)
                setLocalPosition({ x: x, y: y })
              }, 1500)
            }}>Foyer</button>
            <button onClick={() => {
              zoomToElement('LiveStreamView', 1500)
              const x = 6200 + (Math.random()-0.5) * 200
              const y = 1860 + 1500 + (Math.random()-0.5) * 2030
              document.getElementById('DragElement')?.setAttribute('style', `transform:translate(${x}px, ${y}px);`)
              setTimeout(() => {
                onPanChange(transformRef.current?.state)
                setLocalPosition({ x: x, y: y })
              }, 1500)
            }}>Stage</button>
          </div>
          <TransformComponent>
            {children}
          </TransformComponent>
        </React.Fragment>)}
    </TransformWrapper>
  )
}
