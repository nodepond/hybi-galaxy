type Point = {x:number, y:number}

export const getVectorDistance = (p1:Point, p2:Point):number => {
	const a = p1.x - p2.x
	const b = p1.y - p2.y
	const c = Math.sqrt(a*a + b*b)
	return c
}

export const mapVolumeToDist = (max:number, dist:number):number => {
	const volume = 1 - dist/max
	const p = volume > 0 ? volume : 0
	return p
}

export const getVolumeByDistance = (p1:Point, p2:Point):number => {
	const d = getVectorDistance(p1, p2)
	// const dWidth = document.body.clientWidth / 2 // relative distance based on screen size
	const dWidth = 650 // 3 * video size as a starter?
	const v = mapVolumeToDist(dWidth, d)
	return v
}

export const getVolumeByRoomOrDistance = (ownRoom:String, otherUserRoom:String, p1:Point, p2:Point):number => {
	let vol = 0
	const inDefaultRoom = ownRoom === 'default'
	const shareSameRoom = ownRoom === otherUserRoom
	const shareSameRoomNotDefault = ownRoom === otherUserRoom && !inDefaultRoom
	if (inDefaultRoom && shareSameRoom) {
		vol = getVolumeByDistance(p1, p2)
	} else if (shareSameRoomNotDefault) {
		vol = 1
	} else (
		// mute user if in different room
		vol = 0
	)
	return vol
}
