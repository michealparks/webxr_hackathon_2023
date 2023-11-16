<script lang='ts'>
  import { useFrame } from '@threlte/core'
  import { HandAttachment } from '$lib/handAttachment';
  import * as THREE from 'three'
	import { T } from '@threlte/core'
  import { useController, useHand, useXR } from '@threlte/xr'

  const handAttachment = new HandAttachment([]); // three js renderer.xr.getHand(0)

  // const orangeButton = makeButtonMesh( 0.045, 0.005, 0.03, 0xffd3b5 );
  const orangeButton = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.005, 0.03), new THREE.MeshBasicMaterial({
    color: 0xffd3b5
  })) // element to attach, add physics object to button, detect events?

  // @todo attach physics object to index finger tip
  const fingerTipCollider = new THREE.Object3D(); // Should be kinematic rapier physics object
  handAttachment.attachObjectToJoint(fingerTipCollider, 'index-finger-tip', 'right' );
  
  const rotOffset = new THREE.Object3D();
  rotOffset.rotation.x = Math.PI; // flip the button
  rotOffset.add(orangeButton);
  orangeButton.position.set( - 0.04, 0, 0 );
  // @todo add kinematic physics object here
  // See below for all possible joints
  // https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/XRHandMeshModel.js
  handAttachment.attachObjectToJoint(rotOffset, 'pinky-finger-metacarpal', 'left' );
  
  // const pinkButton = makeButtonMesh( 0.045, 0.005, 0.03, 0xe84a5f );
  
  // const rotOffset2 = new THREE.Object3D();
  // rotOffset2.rotation.x = Math.PI; // flip the button
  // rotOffset2.add(pinkButton);
  // pinkButton.position.set( - 0.04, 0, 0.035 );
  // handAttachment.attachObjectToJoint(rotOffset2, 'pinky-finger-metacarpal', 'left' );

</script>