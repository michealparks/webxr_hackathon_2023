<script lang="ts">
  import { World, Debug } from '@threlte/rapier'
  import { createRatk } from '$lib/ratk'
  import XR from '$lib/components/XR.svelte'
	import Planes from '$lib/components/Planes.svelte'
	import Portal from '$lib/components/Portal.svelte'
  import PortalScene from '$lib/components/PortalScene.svelte'
	import Bullets from '$lib/components/Bullets.svelte';
	import StaticBodies from '$lib/components/StaticBodies.svelte';

  createRatk()

  const debug = true
</script>

<World>
  <Planes>
    <Portal>
      <PortalScene />
    </Portal>  
  </Planes>

  <StaticBodies />
  <Bullets />
  
  <XR />

  {#if debug}
    <Debug />
  {/if}
</World>

