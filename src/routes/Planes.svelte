<script lang='ts'>
  import { RealityAccelerator } from 'ratk'
  import { T, useThrelte, useFrame } from '@threlte/core'

  const { scene, renderer } = useThrelte()
  const ratk = new RealityAccelerator(renderer.xr)

  scene.add(ratk.root)

  useFrame(() => {
    ratk.update()
  })

  let meshes: THREE.Mesh[] = []

  ratk.onPlaneAdded = (plane) => {
    if (plane.planeMesh) {
      meshes = [...meshes, plane.planeMesh]
    }
  }

  ratk.onPlaneDeleted = (plane) => {
    meshes = meshes.filter((mesh) => plane.planeMesh !== mesh)
  }
</script>

{#each meshes as mesh}
  <T is={mesh}>
    <T.MeshStandardMaterial />
  </T>
{/each}