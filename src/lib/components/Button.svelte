<script>
	import { createEventDispatcher } from 'svelte'
	import { T } from '@threlte/core'
	import { RoundedBoxGeometry, Text } from '@threlte/extras'
	import { Box } from '@threlte/flex'

	export let positionX = 0
	export let positionY = 0
	export let positionZ = 0
	export let width = 0.5
	export let height = 0.1
	export let depth = 0.2
	export let text = 'Open Tutorial'

	const dispatch = createEventDispatcher()

	let hovering = false

	function onPointerEnter() {
		hovering = true
	}

	function onPointerLeave() {
		hovering = false
	}
</script>

<Box>
	<T.Mesh
		position={[positionX, positionY, positionZ]}
		on:click={(e) => {
			e.stopPropagation()
			dispatch('click')
		}}
		on:pointerenter={onPointerEnter}
		on:pointerleave={onPointerLeave}
	>
		<RoundedBoxGeometry args={[width, height, depth]} radius={0.02} />
		<T.MeshBasicMaterial color={hovering ? '#9f7060' : '#404550'} />
		<Text position.z={0.02} {text} anchorX="center" anchorY="middle" color="#ffffff" />
	</T.Mesh>
</Box>
