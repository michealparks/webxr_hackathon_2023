<script lang="ts">
	import { initPeer } from '$lib/peer'
	import { createRatk } from '$lib/ratk'
	import { Audio } from '@threlte/extras'
	import Planes from './components/Planes.svelte'
	import Portal from './components/Portal.svelte'
	import PortalScene from './components/PortalScene.svelte'
	import Bullets from './components/Bullets.svelte'
	import Headset from './components/Headset.svelte'
	import HandEvents from './components/HandEvents.svelte'
	import Enemy from './components/Enemy.svelte'
	import Target from './components/Target.svelte'

	createRatk()

	const peer = false

	if (peer) initPeer()
</script>

<Headset />

<Audio
	src='audio/game.mp3'
	volume={0.3}
	autoplay={true}
	loop={true}
/>

<HandEvents />

<Enemy />

<Planes>
	<Portal>
		<PortalScene>
			<Target />
			<Target position={[0.5, 0.5, -0.5]} delay={1000} />
			<Target position={[-0.5, 0.25, -1]} delay={2000} />
		</PortalScene>
	</Portal>
</Planes>

<Bullets />
