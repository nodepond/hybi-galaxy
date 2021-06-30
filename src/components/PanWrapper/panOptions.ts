// import { PropsList } from "react-zoom-pan-pinch/dist/store/interfaces/propsInterface"

export const panOptions = {
  room: { size: { x: 6000, y: 6000 } },
    get user() {
      return {
        // center the room at kasse
        initialPosition: { x: 600 - (Math.random() * 200 - 100), y: 3400 - (Math.random() * 200 - 100) },
        size: { x: 200, y: 200 },
      }
    },
}

export const transformWrapperOptions = {
  wheel: { step: 50 },
  // scale: 1.0,
  // scale: 0.5,
  scale: 0.3,
  // center the window, considering the size of the user view
  // defaultPositionX: -panOptions.user.initialPosition.x +(window.innerWidth-panOptions.user.size.x)/2,
  // defaultPositionY: -panOptions.user.initialPosition.y+(window.innerHeight-panOptions.user.size.y)/2,
  // Notice: this positions are absolute values, scale is not taken into account!!
  defaultPositionX: -600 * 0.3 + 500,
  defaultPositionY: -3700 * 0.3 + 500,
  // Notice: this positions are absolute values, scale is not taken into account!! So we need to make calculations accordingly
  // defaultPositionX: -(panOptions.user.initialPosition.x * 0.3) + ((window.innerWidth-panOptions.user.size.x)/2) * 1.7,
  // defaultPositionY: -(panOptions.user.initialPosition.y * 0.3) + ((window.innerWidth-panOptions.user.size.y)/2) * 1.7,
  positionX: 0,
  positionY: 0,
  options: {
    centerContent: false,
    limitToBounds: false,
    limitToWrapper: false,
    minScale: 0.1,
    maxScale: 3,
    // maxPositionX:500, maxPositionY:500,
    // minPositionX:0, minPositionY:0
  },
  // scalePadding:{animationTime:10},
  pan: { 
    velocityEqualToMove: true,
  },
  pinch: { disabled: true },
}
