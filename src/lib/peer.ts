// import {io} from 'socket.io'
import RTCMultiConnection from 'rtcmulticonnection'
import * as THREE from 'three'

export const peer = {
	headset: {
		position: new THREE.Vector3(),
		quaternion: new THREE.Quaternion()
	},
	controllers: {
		left: {
			position: new THREE.Vector3(),
			quaternion: new THREE.Quaternion()
		},
		right: {
			position: new THREE.Vector3(),
			quaternion: new THREE.Quaternion()
		}
	}
}

export const initPeer = () => {
	const connection = new RTCMultiConnection()

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
			case 'ready': {
				// @todo
				// start sending updates  each frame, need way to connect to the update function, useFrame??
				const dummyUpdate = new Float32Array(21).fill(2);
				connection.send({ message: 'update', array: dummyUpdate })
				break
			}
			case 'fire-weapon': {
				// @todo
				break
			}
		}
	}

	connection.openOrJoin('your-room-id', () => {
		// console.log(connection);
		// connection.send('hello everyone');
		// const allParticipantsLength = connection.getAllParticipants().length
		// const allParticipantsLength = connection.peers.getLength()
		// console.log(allParticipantsLength)
		// if (allParticipantsLength === 0) {
		// 	// retry
		// 	console.log("No Players found");
		// 	return;
		// }
		connection.send({message: 'ready', array: [0]})
	})
	// connection.onopen = (event) => {
		
	// }
}
