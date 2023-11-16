<script lang="ts">
	import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
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
  <World>
    <XR>
      <slot />
    </XR>
  </World>
</Canvas>

<ARButton
	sessionInit={{
		requiredFeatures: ['hit-test', 'plane-detection', 'mesh-detection', 'anchors']
	}}
/>
