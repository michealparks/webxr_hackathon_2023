<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { ARButton } from '@threlte/xr'
  import XR from '$lib/components/XR.svelte'
</script>

<Canvas
	rendererParameters={{
		antialias: true,
		alpha: true,
		stencil: true
	}}
>
  <slot />

  <XR />
</Canvas>

<ARButton
	sessionInit={{
		requiredFeatures: ['hit-test', 'plane-detection', 'mesh-detection', 'anchors']
	}}
/>
