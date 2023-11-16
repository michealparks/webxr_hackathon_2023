import { useFrame } from '@threlte/core'
import { createPlayerState } from './utils'
import { useHeadset, useController, useHand, useXR } from '@threlte/xr'

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

	connection.onopen = (event) => {
		// connection.send('hello everyone');
		const allParticipants = connection.getAllParticipants()
		if (allParticipants.length === 0) {
			// retry
		}
		connection.send('ready')

		//   connection.getAllParticipants().forEach(function(participantId) {
		//     console.log(participantId);
		// });
	}

	connection.onmessage = function (event) {
		const { message, array } = event.data

		switch (message) {
			case 'update': {
				peer.headset.position.x = array[0]
				peer.headset.position.y = array[1]
				break
			}
			case 'ready': {
				// @todo
				break
			}
			case 'fire-weapon': {
				// @todo
				break
			}
		}
	}

	connection.openOrJoin('your-room-id')

	const player = createPlayerState()
	const { isHandTracking } = useXR()
	const headset = useHeadset()
	const leftCtrl = useController('left')
	const rightCtrl = useController('right')

	useFrame(() => {
		if (!leftCtrl.current || !rightCtrl.current) return

		player.headset.position.copy(headset.position)
		player.headset.quaternion.copy(headset.quaternion)
	
		player.controllers.left.position.copy(leftCtrl.current.grip.position)
		player.controllers.right.position.copy(rightCtrl.current.grip.position)

		player.controllers.left.quaternion.copy(leftCtrl.current.grip.quaternion)
		player.controllers.right.quaternion.copy(rightCtrl.current.grip.quaternion)

		// send "player" to other server
	})
}
