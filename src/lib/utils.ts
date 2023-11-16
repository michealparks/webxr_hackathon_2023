import * as THREE from 'three'

export const createPlayerState = () => {
  return {
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
  
}