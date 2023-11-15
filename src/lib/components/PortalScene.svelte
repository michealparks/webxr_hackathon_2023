<script lang='ts'>
  import { T, useFrame } from '@threlte/core'

  let mesh2: THREE.Mesh

  useFrame(() => {
    if (!mesh2) return

    mesh2.rotation.x += 0.01
    mesh2.rotation.y += 0.01
  })
</script>

<T.Mesh
  bind:ref={mesh2}
  name="box"
  position={[0, 0, -2]}
>
  <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
  <T.MeshPhongMaterial color="hotpink" />
</T.Mesh>

<T.AmbientLight />
<T.DirectionalLight />
