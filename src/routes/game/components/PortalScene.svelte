<script lang="ts">
	import { T, useFrame } from '@threlte/core'
	import Debug from './Debug.svelte'

	let mesh: THREE.Mesh

	useFrame(() => {
		if (!mesh) return

		mesh.rotation.x += 0.01
		mesh.rotation.y += 0.01
	})
</script>

<T.Mesh bind:ref={mesh} name="box" position={[0, 0, -2]}>
	<T.BoxGeometry args={[0.5, 0.5, 0.5]} />
	<T.MeshPhongMaterial color="hotpink" />
</T.Mesh>

<T.AmbientLight />
<T.DirectionalLight />

<Debug />
