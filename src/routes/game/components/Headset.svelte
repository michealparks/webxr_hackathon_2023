<script lang="ts">
	import { Collider, RigidBody } from '@threlte/rapier'
	import { AudioListener, Audio } from '@threlte/extras'
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { useHeadset, Headset } from '@threlte/xr'
	import { useFixed } from '$lib/useFixed'

	let rigidBody: RapierRigidBody

	const headset = useHeadset()

	useFixed(
		() => {
			rigidBody.setTranslation(headset.position, true)
		},
		{ fixedStep: 1 / 30 }
	)
</script>

<RigidBody bind:rigidBody type="kinematicPosition">
	<Collider sensor shape="ball" args={[0.3]} />
</RigidBody>

<Headset>
	<AudioListener />
</Headset>
