<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { XRPlanes } from 'three/examples/jsm/webxr/XRPlanes';

	const { renderer } = useThrelte();

	const planes = new XRPlanes(renderer);

	planes.addEventListener('planeschanged', () => {
		console.log(planes);
		for (const child of planes.children) {
			child.material.wireframe = true;
		}
	});
</script>

<T is={planes} />
