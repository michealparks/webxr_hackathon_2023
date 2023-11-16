<script lang="ts">
	import { onMount } from 'svelte'
	import { initPeer } from '$lib/peer'
	import { createRatk } from '$lib/ratk'
	import Planes from './Planes.svelte'
	import Portal from './Portal.svelte'
	import PortalScene from './PortalScene.svelte'
	import Bullets from './Bullets.svelte'
	import PhysicsDebug from './PhysicsDebug.svelte'
	import Headset from './Headset.svelte'

	createRatk()

	const debug = true

	onMount(() => {
		initPeer()
	})
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
