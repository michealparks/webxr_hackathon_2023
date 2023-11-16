<script lang="ts">
	import { initPeer } from '$lib/peer'
	import { createRatk } from '$lib/ratk'
	import { Audio } from '@threlte/extras'
	import Planes from './components/Planes.svelte'
	import Portal from './components/Portal.svelte'
	import PortalScene from './components/PortalScene.svelte'
	import Bullets from './components/Bullets.svelte'
	import PhysicsDebug from './components/PhysicsDebug.svelte'
	import Headset from './components/Headset.svelte'
	import HandEvents from './components/HandEvents.svelte'
	import Enemy from './components/Enemy.svelte'
	import Target from './components/Target.svelte'

	createRatk()

	const debug = false
	const peer = true

	if (peer) initPeer()
</script>

<Headset />

<Audio src='audio/game.mp3' />

<HandEvents />

<Enemy />


<Planes>
	<Portal>
		<PortalScene>
			<Target />
		</PortalScene>
	</Portal>
</Planes>

<Bullets />

{#if debug}
	<PhysicsDebug />
{/if}
