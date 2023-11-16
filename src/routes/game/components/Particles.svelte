<script lang='ts'>
  import * as THREE from 'three'
  import { T, useFrame } from '@threlte/core'
  import { particles } from '$lib/particles'

  const { positions, rotations, scales, angvels, linvels, count } = particles
  const size = 0.05
  const geometry = new THREE.BoxGeometry(size, size, size)
  const material = new THREE.MeshBasicMaterial()
  const mesh = new THREE.InstancedMesh(geometry, material, count)

  const mat4 = new THREE.Matrix4()
  const position = new THREE.Vector3()
  const euler = new THREE.Euler()
  const rotation = new THREE.Quaternion()
  const scale = new THREE.Vector3(1, 1, 1)


  useFrame((ctx, dt) => {
    for (let i = 0, j = 0, l = count; i < l; i += 1, j += 3) {
      positions[j + 0] += linvels[j + 0]
      positions[j + 1] += linvels[j + 1]
      positions[j + 2] += linvels[j + 2]

      rotations[j + 0] += angvels[j + 0]
      rotations[j + 1] += angvels[j + 1]
      rotations[j + 2] += angvels[j + 2]

      scales[j + 0] -= 0.05
      scales[j + 1] -= 0.05
      scales[j + 2] -= 0.05

      if (scales[j + 0] < 0) scales[j + 0] = 0
      if (scales[j + 1] < 0) scales[j + 1] = 0
      if (scales[j + 2] < 0) scales[j + 2] = 0

      position.set(positions[j + 0], positions[j + 1], positions[j + 2])
      euler.set(rotations[j + 0], rotations[j + 1], rotations[j + 2])
      rotation.setFromEuler(euler)
      scale.set(scales[j + 0], scales[j + 1], scales[j + 2])
      mat4.compose(position, rotation, scale)
      mesh.setMatrixAt(i, mat4)
    }

    mesh.instanceMatrix.needsUpdate = true
  })
</script>

<T is={mesh} />
