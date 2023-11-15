<script lang='ts'>
  import { T } from '@threlte/core'
  import { useController } from '@threlte/xr'
  import { RigidBody } from '@threlte/rapier'
  import { InstancedMesh, Instance, useGamepad } from '@threlte/extras'

  const leftPad = useGamepad({ hand: 'left', xr: true })
  const rightPad = useGamepad({ hand: 'right', xr: true })

  const controllers = {
    left: useController('left'),
    right: useController('right'),
  }

  const handleFireStart = (hand: 'left' | 'right') => () => {
    const controller = controllers[hand].current
    console.log('firestart', hand)
  }

  const handleFireEnd = (hand: 'left' | 'right') => () => {
    const controller = controllers[hand].current
    controller?.targetRay
    console.log('fireEnd', hand)
  }

  leftPad.trigger.on('down', handleFireStart('left'))
  leftPad.trigger.on('up', handleFireEnd('left'))

  rightPad.trigger.on('down', handleFireStart('right'))
  rightPad.trigger.on('up', handleFireEnd('right'))
</script>

<InstancedMesh>
  <T.BoxGeometry />

  <T.MeshStandardMaterial />

  {#each { length: 100 } as _, index}
    <RigidBody type='dynamic'>
      <Instance />
      <Instance />
    </RigidBody>
  {/each}
</InstancedMesh>
