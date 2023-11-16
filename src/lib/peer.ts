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
}
