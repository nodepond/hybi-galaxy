import React, { useRef } from "react"
import { TransformComponent, TransformWrapper, ReactZoomPanPinchRef } from "react-zoom-pan-pinch"
import { useLocalStore } from "./../../store/LocalStore"
import styled from 'styled-components'

const panChange = store => store.onPanChange
const setPos = store => store.setLocalPosition

const Button = styled.button`
  margin: 6px;
  padding: 12px 24px;
  background-color: #ccc;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.primary['2']};
  color: black;
  font-size: 1.1rem;
  border: none;
  &:hover {
    background-color: #3b3b3b;
    color: white;
  }
`

export const PanWrapper = ({children}) => {
  const transformRef = useRef<ReactZoomPanPinchRef>(null)
  const onPanChange = useLocalStore(panChange)
  const setLocalPosition = useLocalStore(setPos)

  return (
    <TransformWrapper 
      ref={transformRef}
      onInit={(e) => {
        if (e.state) {
          onPanChange(e.state)
        }
      }}
      onPanning={(e) => {
        if (e.state) {
          onPanChange(e.state)
        }
      }}
      onPanningStop={(e) => {
        if (e.state) {
          onPanChange(e.state)
        }
      }}
      onZoom={(e) => {
        if (e.state) {
          onPanChange(e.state)
        }
      }}
      onZoomStop={(e) => {
        if (e.state) {
          onPanChange(e.state)
        }
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
            <Button onClick={() => { 
              zoomIn(0.5)
              setInterval(() => {
                onPanChange(transformRef.current?.state)
              }, 300)
            }}>+</Button>
            <Button onClick={() => { 
              zoomOut(0.5)
              setInterval(() => {
                onPanChange(transformRef.current?.state)
              }, 300)
            }}>-</Button>
            <Button onClick={() => {
              zoomToElement('FoyerView', 1500)
              const x = 1756 + (Math.random()-0.5) * 200
              const y = 3326 + (Math.random()-0.5) * 200
              document.getElementById('DragElement')?.setAttribute('style', `transform:translate(${x}px, ${y}px);`)
              setTimeout(() => {
                onPanChange(transformRef.current?.state)
                setLocalPosition({ x: x, y: y })
              }, 1500)
            }}>Foyer</Button>
            <Button onClick={() => {
              zoomToElement('LiveStreamView', 1500)
              const x = 6200 + (Math.random()-0.5) * 200
              const y = 1860 + 1500 + (Math.random()-0.5) * 2030
              document.getElementById('DragElement')?.setAttribute('style', `transform:translate(${x}px, ${y}px);`)
              setTimeout(() => {
                onPanChange(transformRef.current?.state)
                setLocalPosition({ x: x, y: y })
              }, 1500)
            }}>Stage</Button>
          </div>
          <TransformComponent>
            {children}
          </TransformComponent>
        </React.Fragment>)}
    </TransformWrapper>
  )
}
