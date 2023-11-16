<script lang="ts">
	import { T } from '@threlte/core'
	import { RoundedBoxGeometry } from '@threlte/extras'
	import { useRender } from '@threlte/core'
	import { interactivity, transitions } from '@threlte/extras'
	import { Controller, Hand } from '@threlte/xr'
	import { tick } from 'svelte'
	import { Flex, tailwindParser } from '@threlte/flex'
	import Button from '$lib/components/Button.svelte'
	import { pointerControls } from '@threlte/xr'
	import { goto } from '$app/navigation'

	pointerControls('left')
	pointerControls('right')

	interactivity()
	transitions()

	useRender(async ({ camera, scene, renderer }) => {
		await tick()
		renderer.render(scene, camera.current)
	})
</script>

<Controller left />
<Controller right />

<Hand left />
<Hand right />

<T.Group position={[0, 1.8, 0]}>
	<Flex classParser={tailwindParser} class="flex-col">
		<T.Mesh>
			<RoundedBoxGeometry args={[3, 2, 0.02]} radius={0.05} />
			<T.MeshBasicMaterial color="#a99756" />
		</T.Mesh>

		<!-- <Button
			positionX={0}
			positionY={0}
			positionZ={0.05}
			width={1}
			height={0.3}
			depth={0.01}
			text="Show tutorial"
			on:click={() => goto('/tutorial')}
		/> -->

		<Button
			positionX={0}
			positionY={-0.5}
			positionZ={0.05}
			width={1}
			height={0.3}
			depth={0.01}
			text="Start playing"
			on:click={() => goto('/game')}
		/>
	</Flex>
</T.Group>
