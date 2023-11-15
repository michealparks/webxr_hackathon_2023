<script lang="ts">
	import * as THREE from 'three'
	import { T, injectPlugin } from '@threlte/core'

	let portal = new THREE.Mesh()
	let material = new THREE.MeshPhongMaterial()
	material.depthWrite = false
	material.stencilWrite = true
	material.stencilRef = 1
	material.stencilFunc = THREE.AlwaysStencilFunc
	material.stencilZPass = THREE.ReplaceStencilOp

	injectPlugin('portal', ({ ref }) => {
		let currentRef = ref;

		if (ref.isMesh === false) return;
		if (ref.uuid === portal.uuid) return;

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
</script>

<T.Group>
  <T.ArrowHelper />

  <T is={portal} position.y={radius + offsetY}>
    <T is={material} />
    <T.CircleGeometry
      args={[radius, 64]}
    />
  </T>

  <T.Group position={[0, 0, -1]}>
    <slot />
  </T.Group>
</T.Group>

