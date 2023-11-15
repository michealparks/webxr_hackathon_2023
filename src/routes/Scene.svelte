<script lang="ts">
	import { T, useFrame } from '@threlte/core'
  import XR from '$lib/components/XR.svelte'
	import Planes from '$lib/components/Planes.svelte'
	import Portal from '$lib/components/Portal.svelte'
  import PortalScene from '$lib/components/PortalScene.svelte';

	let mesh2: THREE.Mesh;

	useFrame(() => {
		if (!mesh2) return;
		mesh2.rotation.x += 0.01;
		mesh2.rotation.y += 0.01;
	});
</script>

<Planes />

<XR />

<Portal>
	<PortalScene />
</Portal>
