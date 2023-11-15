<script lang="ts">
  import XR from '$lib/components/XR.svelte'
	import Planes from '$lib/components/Planes.svelte'
	import Portal from '$lib/components/Portal.svelte'
  import PortalScene from '$lib/components/PortalScene.svelte'
  import { createRatk } from '$lib/ratk'

  createRatk()
</script>

<Planes>
  <Portal>
    <PortalScene />
  </Portal>  
</Planes>

<XR />
