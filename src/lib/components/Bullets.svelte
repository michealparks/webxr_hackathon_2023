<script lang="ts">
	import * as THREE from 'three'
	import { T } from '@threlte/core'
	import { useGamepad } from '@threlte/extras'
	import { RigidBody, Collider } from '@threlte/rapier'
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { useController } from '@threlte/xr'
	import { useFixed } from '$lib/hooks/useFixed'
	import { inPortal } from '$lib/state'

	const leftPad = useGamepad({ hand: 'left', xr: true })
	const rightPad = useGamepad({ hand: 'right', xr: true })

	const controllers = {
		left: useController('left'),
		right: useController('right')
	}

	const numBullets = 40
	const bulletSpeed = 20
	const bulletLength = 0.05
	const bulletWidth = 0.02

	const forward = new THREE.Vector3()
	const bodies: RapierRigidBody[] = []
	const meshes: THREE.Mesh[] = []
	const materials: THREE.Material[] = []

	let cursor = 0

	const frame = (hand: 'left' | 'right') => {
		const targetRay = controllers[hand].current?.targetRay

		if (!targetRay) return

		const { quaternion, position } = targetRay
		const body = bodies[cursor]!

		inPortal.delete(body.handle)

		forward.set(0, 0, -1).applyQuaternion(quaternion).multiplyScalar(bulletSpeed)

		body.setRotation({ x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w }, false)
		body.setTranslation({ x: position.x, y: position.y, z: position.z }, false)
		body.setAngvel({ x: 0, y: 0, z: 0 }, false)
		body.setLinvel({ x: forward.x, y: forward.y, z: forward.z }, true)

		cursor += 1
		cursor %= numBullets
	}

	const leftFrame = useFixed(() => frame('left'), { fixedStep: 1 / 5, autostart: false })
	const rightFrame = useFixed(() => frame('right'), { fixedStep: 1 / 5, autostart: false })

	const handleFireStart = (hand: 'left' | 'right') => () => {
		if (hand === 'left') {
			leftFrame.start()
		} else {
			rightFrame.start()
		}
	}

	const handleFireEnd = (hand: 'left' | 'right') => () => {
		if (hand === 'left') {
			leftFrame.stop()
		} else {
			rightFrame.stop()
		}
	}

	leftPad.trigger.on('down', handleFireStart('left'))
	leftPad.trigger.on('up', handleFireEnd('left'))

	rightPad.trigger.on('down', handleFireStart('right'))
	rightPad.trigger.on('up', handleFireEnd('right'))

	for (let i = 0; i < numBullets; i += 1) {
		const material = new THREE.MeshBasicMaterial()
		const geometry = new THREE.BoxGeometry(bulletWidth, bulletWidth, bulletLength)
		materials.push(material)
		meshes.push(new THREE.Mesh(geometry, material))

		material.stencilWrite = true
		material.stencilRef = 1
		material.stencilFunc = THREE.EqualStencilFunc
	}
</script>

{#each { length: numBullets } as _, index (index)}
	<T.Group position={[index + 9999, 0, 0]}>
		<RigidBody bind:rigidBody={bodies[index]} gravityScale={0}>
			<Collider shape="cuboid" args={[bulletWidth / 2, bulletWidth / 2, bulletLength / 2]} />
			<T is={meshes[index]} />
		</RigidBody>
	</T.Group>
{/each}
