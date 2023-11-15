<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { ARButton } from '@threlte/xr';
	import Scene from './Scene.svelte';
</script>

<Canvas
	rendererParameters={{
		antialias: true,
		alpha: true,
		stencil: true
	}}
>
	<Scene />
</Canvas>

<ARButton
	sessionInit={{
		requiredFeatures: ['hit-test', 'plane-detection', 'mesh-detection', 'anchors']
	}}
/>
