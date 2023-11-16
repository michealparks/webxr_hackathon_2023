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
          // if (pose === "shootStart" && distance < 0.05) console.log(distance);
          // if (pose === "point") console.log(distance);
          // if (pose === "fist") console.log(distance);
          if (distance < minDistance) minPose = pose
        })

        handGestureState.firing = true

        console.log(minPose)
      }
      
      start()
    })
  })
</script>