<script lang='ts'>
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { useGamepad, InstancedMesh, Instance } from '@threlte/extras'
  import { RigidBody, Collider } from '@threlte/rapier'
  import { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { useController } from '@threlte/xr'
	import { useFixed } from '$lib/hooks/useFixed'

  const leftPad = useGamepad({ hand: 'left', xr: true })
  const rightPad = useGamepad({ hand: 'right', xr: true })

  const controllers = {
    left: useController('left'),
    right: useController('right'),
  }

  let cursor = 0

  const bulletSpeed = 8

  const forward = new THREE.Vector3()

  const frame = (hand: 'left' | 'right') => {
    const targetRay = controllers[hand].current?.targetRay

    if (!targetRay) return

    const body = bodies[cursor]!

    forward.set(0, 0, -1).applyQuaternion(targetRay.quaternion).multiplyScalar(bulletSpeed)

    body.setRotation({ x: targetRay.quaternion.x, y: targetRay.quaternion.y, z: targetRay.quaternion.z, w: targetRay.quaternion.w }, false)
    body.setTranslation({ x: targetRay.position.x, y: targetRay.position.y, z: targetRay.position.z }, false)
    body.setAngvel({ x: 0, y: 0, z: 0 }, false)
    body.setLinvel({ x: forward.x, y: forward.y, z: forward.z }, true)
    
    cursor += 1
    cursor %= numBullets
  }

  const leftFrame = useFixed(() => frame('left'), { fixedStep: 1 / 5, autostart: false })
  const rightFrame = useFixed(() => frame('right'), { fixedStep: 1 / 5, autostart: false })

  const handleFireStart = (hand: 'left' | 'right') => () => {
    if (hand === 'left') {
      leftFrame.start()
    } else {
      rightFrame.start()
    }
  }

  const handleFireEnd = (hand: 'left' | 'right') => () => {
    if (hand === 'left') {
      leftFrame.stop()
    } else {
      rightFrame.stop()
    }
  }

  leftPad.trigger.on('down', handleFireStart('left'))
  leftPad.trigger.on('up', handleFireEnd('left'))

  rightPad.trigger.on('down', handleFireStart('right'))
  rightPad.trigger.on('up', handleFireEnd('right'))

  const bodies: RapierRigidBody[] = []

  let bullets: THREE.Vector3[] = []
  let numBullets = 300
  const bulletLength = 0.05
  const bulletWidth = 0.02

  for (let i = 0; i < numBullets; i += 1) {
    bullets.push(new THREE.Vector3(0, 1, 0))
  }
</script>

<InstancedMesh limit={numBullets}>
  <T.BoxGeometry args={[bulletWidth, bulletWidth, bulletLength]} />
  <T.MeshBasicMaterial />
  {#each { length: numBullets } as _, index (index)}
    <RigidBody bind:rigidBody={bodies[index]} gravityScale={0}>
      <Collider
        shape='cuboid'
        args={[bulletWidth / 2, bulletWidth / 2, bulletLength / 2]}
      />
      <Instance />
    </RigidBody>
  {/each}
</InstancedMesh>