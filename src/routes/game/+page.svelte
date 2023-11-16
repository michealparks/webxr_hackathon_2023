<script lang="ts">
	import { createRatk } from '$lib/ratk'
	import Planes from '$lib/components/Planes.svelte'
	import Portal from '$lib/components/Portal.svelte'
	import PortalScene from '$lib/components/PortalScene.svelte'
	import Bullets from '$lib/components/Bullets.svelte'
	import PhysicsDebug from '$lib/components/PhysicsDebug.svelte'
	import Headset from '$lib/components/Headset.svelte'

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
