<script lang="ts">
	import * as THREE from 'three'
	import type { Plane } from 'ratk'
	import { T } from '@threlte/core'
	import { Collider } from '@threlte/rapier'
	import { useRatk } from '$lib/ratk'
	import { useRapier } from '@threlte/rapier'
	import { hideBody } from '$lib/physics'
	import { inPortal, bulletState } from '$lib/state'

	const { world } = useRapier()

	const ratk = useRatk()
	const group = new THREE.Group()

	let enabled = false
	let planes: Plane[] = []
	let walls: Plane[] = []

	const vec3 = new THREE.Vector3()

	ratk.onPlaneAdded = (plane) => {
		planes = [...ratk.planes]

		for (const plane of ratk.planes) {
			if (plane.planeMesh === undefined) {
				continue
			}

			plane.planeMesh.geometry.computeBoundingBox()
		}

		// @ts-expect-error
		const xrPlane = plane._xrPlane

		if (xrPlane.orientation !== 'vertical') {
			return
		}

		walls.splice(0, walls.length)

		for (const plane of ratk.planes) {
			if (xrPlane.orientation !== 'vertical') {
				continue
			}

			if (plane.planeMesh === undefined) {
				continue
			}

			walls.push(plane)
		}

		walls = walls

		const [wall] = walls

		if (!wall) {
			enabled = false
			return
		}

		group.position.set(wall.position.x, 0, wall.position.z)
		wall.getWorldDirection(vec3)
		group.lookAt(vec3)
		group.rotation.x = 0
		group.rotation.z = 0

		enabled = true
	}

	const handleEnter = (event) => {
		const { handle } = event.targetRigidBody

		if (inPortal.has(handle)) return

		const body = world.bodies.get(event.targetRigidBody.handle)

		if (body === null) return

		hideBody(body)


	}
</script>

{#each walls as wall}
	<T is={wall} />
{/each}

{#if enabled}
	<T is={group}>
		<slot />
	</T>
{/if}

{#each planes as plane}
	{@const size = plane.planeMesh?.geometry.boundingBox?.getSize(vec3) ?? { x: 0, z: 0 }}
	<T is={plane} visible={false}>
		<T.Group rotation.x={Math.PI / 2} position={[0, -0.1, 0]}>
			<Collider
				sensor
				shape="cuboid"
				args={[size.x / 2, size.z / 2, 0.1]}
				on:sensorenter={handleEnter}
			/>
		</T.Group>
	</T>
{/each}
