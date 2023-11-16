<script lang="ts">
	import * as THREE from 'three'
	import { T, injectPlugin } from '@threlte/core'
	import { Collider, RigidBody, useRapier } from '@threlte/rapier'
	import type {
		RigidBody as RapierRigidBody,
		Collider as RapierCollider
	} from '@dimforge/rapier3d-compat'
	import { useFixed } from '$lib/useFixed'
	import { inPortal } from '$lib/state'

	const { world } = useRapier()

	let rigidBody: RapierRigidBody

	const portal = new THREE.Mesh()
	const material = new THREE.MeshPhongMaterial()
	material.depthWrite = false
	material.stencilWrite = true
	material.stencilRef = 1
	material.stencilFunc = THREE.AlwaysStencilFunc
	material.stencilZPass = THREE.ReplaceStencilOp

	injectPlugin('portal', ({ ref }) => {
		let currentRef = ref

		if (ref.isMesh === false) return
		if (ref.uuid === portal.uuid) return

		const setStencilProps = (mesh: THREE.Mesh) => {
			const { material } = mesh

			if (material instanceof THREE.Material) {
				material.stencilWrite = true
				material.stencilRef = 1
				material.stencilFunc = THREE.EqualStencilFunc
			}
		}

		setStencilProps(ref)

		return {
			onRefChange: (ref) => {
				currentRef = ref
				setStencilProps(currentRef)
			},
			onPropsChange: () => {
				setStencilProps(currentRef)
			}
		}
	})

	const radius = 0.7
	const offsetY = 0.2

	const handlePortalEnter = (event: {
		targetCollider: RapierCollider
		targetRigidBody: RigidBody | null
	}) => {
		inPortal.set(event.targetRigidBody.handle, true)
	}

	const worldPosition = new THREE.Vector3()
	const worldQuaternion = new THREE.Quaternion()

	useFixed(
		() => {
			rigidBody.setTranslation(portal.getWorldPosition(worldPosition), true)
			rigidBody.setRotation(portal.getWorldQuaternion(worldQuaternion), true)
		},
		{ fixedStep: 1 / 5 }
	)
</script>

<T.Group>
	<T.ArrowHelper />

	<T is={portal} position.y={radius + offsetY}>
		<T is={material} />
		<T.CircleGeometry args={[radius, 64]} />
	</T>

	<T.Group position={[0, 0, -1]}>
		<slot />
	</T.Group>
</T.Group>

<RigidBody bind:rigidBody type="fixed">
	<T.Group rotation.x={Math.PI / 2}>
		<Collider shape="cylinder" args={[0.2, radius]} sensor on:sensorenter={handlePortalEnter} />
	</T.Group>
</RigidBody>
