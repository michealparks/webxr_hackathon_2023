<script lang='ts'>
  import * as THREE from 'three'
  import { T, useFrame } from '@threlte/core'
  import { particles } from '$lib/particles'

  const size = 0.1
  const geometry = new THREE.BoxGeometry(size, size, size)
  const material = new THREE.MeshBasicMaterial()
  const mesh = new THREE.InstancedMesh(geometry, material, particles.count)

  const mat4 = new THREE.Matrix4()

  useFrame(() => {
    for (let i = 0, l = particles.count; i < l; i += 1) {
      mesh.setMatrixAt(i, mat4)
    }
    
  })
</script>

<T is={mesh} />

