<script lang='ts'>
	import { useFrame } from '@threlte/core'
  import {
    update as handyUpdate,
    loadPose as handyLoadPose,
    dumpHands as handyDumpHands
  } from 'https://cdn.jsdelivr.net/npm/handy-work@1.4.0/build/esm/handy-work.standalone.js'
  import { handGestureState } from '$lib/state'

  handyLoadPose(
    'relax',
    'https://raw.githubusercontent.com/AdaRoseCannon/handy-work/main/poses/fist.handpose'
  )
  handyLoadPose(
    'fist',
    'https://raw.githubusercontent.com/AdaRoseCannon/handy-work/main/poses/relax.handpose'
  )

  const { start, stop } = useFrame((ctx) => {
    const session = ctx.renderer.xr.getSession()
  
    if (!session) return

    const frame = ctx.renderer.xr.getFrame()
    const referenceSpace = ctx.renderer.xr.getReferenceSpace()

    stop()

    handyUpdate(session.inputSources, referenceSpace, frame, ({ handedness, distances }) => {
      if (handedness === 'right') {
        let minDistance = 10
        let minPose = null
        distances.forEach(([pose, distance]) => {
          if (distance < minDistance) minPose = pose
        })

        const newState = (minPose === 'relaxed') ? true : false;
        const isChanged = handGestureState.right.firing === newState;
        handGestureState.right.firing = newState;
        handGestureState.right.changedThisFrame = isChanged;
      }
      if (handedness === 'left') {
        let minDistance = 10
        let minPose = null
        distances.forEach(([pose, distance]) => {
          if (distance < minDistance) minPose = pose
        })

        const newState = (minPose === 'relaxed') ? true : false;
        const isChanged = handGestureState.left.firing === newState;
        handGestureState.left.firing = newState;
        handGestureState.left.changedThisFrame = isChanged;
      }
      
      start()
    })
  })
</script>