import { useFrame } from '@threlte/core'
import { createPlayerState } from './utils'
import { useHeadset, useController, useHand, useXR } from '@threlte/xr'
import { networkState } from '$lib/state'

export const peer = createPlayerState()

export const initPeer = () => {
	const connection = new globalThis.RTCMultiConnection()

	// this line is VERY_important
	connection.socketURL = 'https://portal.epicgamer.org:9001/'
	// test server
	// connection.socketURL = 'https://muazkhan.com:9001/';

	// if you want text chat
	connection.session = {
		data: true
	}

	connection.onmessage = function (event) {
		const { message, array } = event.data
		console.log(event.data)
		console.log("MESSAGE RECEIVED												\n\n\n\n")

		switch (message) {
			case 'update': {
				let offset = 0;

				peer.headset.position.set(array[offset], array[offset + 1], array[offset + 2])
				offset += 3
				peer.headset.quaternion.set(array[offset], array[offset + 1], array[offset + 2], array[offset + 3])
				offset += 4

				peer.controllers.left.position.set(array[offset], array[offset + 1], array[offset + 2])
				offset += 3
				peer.controllers.left.quaternion.set(array[offset], array[offset + 1], array[offset + 2], array[offset + 3])
				offset += 4

				peer.controllers.right.position.set(array[offset], array[offset + 1], array[offset + 2])
				offset += 3
				peer.controllers.right.quaternion.set(array[offset], array[offset + 1], array[offset + 2], array[offset + 3])
				offset += 4

				console.log(peer)

				break
			}
			// case 'ready': {
			// 	// @todo
			// 	// start sending updates  each frame, need way to connect to the update function, useFrame??
			// 	const dummyUpdate = new Float32Array(21).fill(2);
			// 	connection.send({ 'update': String, dummyUpdate })
			// 	connection.send({ message: 'update', array: dummyUpdate })
			// 	break
			// }
			case 'fire-weapon': {
				// @todo
				break
			}
		}
	}
	networkState.sendUpdates = false;
	connection.openOrJoin('your-room-id')

	// callback when peer joins
	connection.onopen = (event) => {
		networkState.sendUpdates = true;
		// connection.send({message: 'ready', array: []})
	}

	// callback when peer joins
	connection.onclose = (event) => {
		networkState.sendUpdates = false;
		// connection.send({message: 'ready', array: []})
	}

	const player = createPlayerState()
	const { isHandTracking } = useXR()
	const headset = useHeadset()
	const leftCtrl = useController('left')
	const rightCtrl = useController('right')

	function populateArray(player) {
		const arr = new Float32Array(21);
		let temp = player.headset.position;
		let offset = 0;
		arr[offset] = temp.x;
		arr[offset+1] = temp.y;
		arr[offset+2] = temp.z;
		offset +=3;

		temp = player.headset.quaternion;
		arr[offset] = temp.x;
		arr[offset+1] = temp.y;
		arr[offset+2] = temp.z;
		arr[offset+3] = temp.w;
		offset += 4;

		temp = player.controllers.left.position;
		arr[offset] = temp.x;
		arr[offset+1] = temp.y;
		arr[offset+2] = temp.z;
		offset +=3;

		temp = player.controllers.left.quaternion;
		arr[offset] = temp.x;
		arr[offset+1] = temp.y;
		arr[offset+2] = temp.z;
		arr[offset+3] = temp.w;
		offset += 4;

		temp = player.controllers.right.position;
		arr[offset] = temp.x;
		arr[offset+1] = temp.y;
		arr[offset+2] = temp.z;
		offset +=3;

		temp = player.controllers.right.quaternion;
		arr[offset] = temp.x;
		arr[offset+1] = temp.y;
		arr[offset+2] = temp.z;
		arr[offset+3] = temp.w;
		offset += 4;

		return arr;
	}
	useFrame(() => {
		if (!leftCtrl.current || !rightCtrl.current) return
		if (!networkState.sendUpdates) return;

		player.headset.position.copy(headset.position)
		player.headset.quaternion.copy(headset.quaternion)
	
		player.controllers.left.position.copy(leftCtrl.current.grip.position)
		player.controllers.right.position.copy(rightCtrl.current.grip.position)

		player.controllers.left.quaternion.copy(leftCtrl.current.grip.quaternion)
		player.controllers.right.quaternion.copy(rightCtrl.current.grip.quaternion)

		// send "player" to other server
		const dataArray = populateArray(player);
		console.log(dataArray);
		connection.send({ message: 'update', array: dataArray })
	})
}
