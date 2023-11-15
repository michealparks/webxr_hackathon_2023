<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { XR, Hand, Controller } from '@threlte/xr';
	import { OrbitControls } from '@threlte/extras';
	import Planes from '$lib/components/Planes.svelte';
	import Portal from '$lib/components/Portal.svelte';

	let mesh2: THREE.Mesh;

	useFrame(() => {
		if (!mesh2) return;
		mesh2.rotation.x += 0.01;
		mesh2.rotation.y += 0.01;
	});
</script>

<Planes />

<XR>
	<Controller left />
	<Controller right />

	<Hand left />
	<Hand right />

	<T.PerspectiveCamera slot="fallback" makeDefault position={[0, 0, 5]}>
		<OrbitControls />
	</T.PerspectiveCamera>
</XR>

<Portal>
	<T.Mesh name="box" bind:ref={mesh2} position={[0, 0, -2]}>
		<T.BoxGeometry args={[0.5, 0.5, 0.5]} />
		<T.MeshPhongMaterial color="hotpink" />
	</T.Mesh>
</Portal>

<T.AmbientLight />
<T.DirectionalLight />
