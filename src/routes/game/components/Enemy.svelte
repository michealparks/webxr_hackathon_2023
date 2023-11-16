<script lang='ts'>
  import { T, useFrame } from '@threlte/core'
  import { peer } from '$lib/peer'

  let headset: THREE.Mesh
  let leftHand: THREE.Mesh
  let rightHand: THREE.Mesh

  useFrame(() => {
    headset.position.copy(peer.headset.position)
    headset.quaternion.copy(peer.headset.quaternion)

    leftHand.position.copy(peer.controllers.left.position)
    leftHand.quaternion.copy(peer.controllers.left.quaternion)

    rightHand.position.copy(peer.controllers.right.position)
    rightHand.quaternion.copy(peer.controllers.right.quaternion)
  })
</script>

<T.Mesh bind:ref={headset}>
  <T.BoxGeometry args={[0.15, 0.1, 0.1]} />
  <T.MeshPhongMaterial color='black' />
</T.Mesh>

<T.Mesh bind:ref={leftHand}>
  <T.SphereGeometry args={[0.06]} />
  <T.MeshPhongMaterial color='black' />
</T.Mesh>

<T.Mesh bind:ref={rightHand}>
  <T.SphereGeometry args={[0.06]} />
  <T.MeshPhongMaterial color='black' />
</T.Mesh>
