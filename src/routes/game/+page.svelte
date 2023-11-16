<script lang="ts">
	import { createRatk } from '$lib/ratk'
	import Planes from './Planes.svelte'
	import Portal from './Portal.svelte'
	import PortalScene from './PortalScene.svelte'
	import Bullets from './Bullets.svelte'
	import PhysicsDebug from './PhysicsDebug.svelte'
	import Headset from './Headset.svelte'

	createRatk()

	const debug = true
</script>

<Headset />

<Planes>
	<Portal>
		<PortalScene />
	</Portal>
</Planes>

<Bullets />

{#if debug}
	<PhysicsDebug />
{/if}
