<script lang="ts">
	import * as THREE from 'three'
	import { T } from '@threlte/core'
	import { useRatk } from '$lib/ratk'

	const ratk = useRatk()
	const group = new THREE.Group()
	let walls: THREE.Mesh[] = []
	const vec3 = new THREE.Vector3()

	ratk.onPlaneAdded = (plane) => {
		console.log(plane._xrPlane)
		if (plane._xrPlane.orientation !== 'vertical') {
			return
		}

		walls.splice(0, walls.length)

		for (const plane of ratk.planes) {
			if (plane._xrPlane.orientation !== 'vertical') {
				continue
			}
	
			if (plane.planeMesh === undefined) {
				continue
			}

			plane.planeMesh.material = new THREE.MeshBasicMaterial({
				color: 'red',
				wireframe: true,
			})

			walls.push(plane)
		}

		walls = walls

		const [wall] = walls

		if (!wall) return


		group.position.set(wall.position.x, 0, wall.position.z)
		wall.getWorldDirection(vec3)
		group.lookAt(vec3)
	}
</script>

{#each walls as wall}
	<T is={wall} />
{/each}

<T is={group}>
	<slot />
</T>