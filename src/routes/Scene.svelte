<script lang='ts'>
  import * as THREE from 'three'
  import { T, useThrelte, useFrame } from '@threlte/core'
	import { XR, Hand, Controller } from '@threlte/xr';

  const { scene, renderer } = useThrelte()

  renderer.setClearColor(0x000000)

  const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshStandardMaterial(),
  )
  mesh1.position.x = 0.5
  scene.add(mesh1)

  let mesh2: THREE.Mesh

  useFrame(() => {
    mesh1.rotation.x += 0.01
    mesh1.rotation.y += 0.01

    mesh2.rotation.x += 0.01
    mesh2.rotation.y += 0.01
  })
</script>

<T.Mesh bind:ref={mesh2} position.x={-0.5}>
  <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
  <T.MeshStandardMaterial />
</T.Mesh>

<XR>
  <svelte:fragment slot="fallback">
    <T.PerspectiveCamera
      makeDefault
      position={[0, 0, 5]}
    >

    </T.PerspectiveCamera>
  </svelte:fragment>
</XR>

<Controller left />
<Controller right />

<Hand left />
<Hand right />

<T.AmbientLight />
<T.DirectionalLight />