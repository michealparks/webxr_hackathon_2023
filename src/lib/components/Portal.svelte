<script lang="ts">
	import * as THREE from 'three';
	import { T, injectPlugin } from '@threlte/core';

	let portal = new THREE.Mesh();
	let material = new THREE.MeshPhongMaterial();
	material.depthWrite = false;
	material.stencilWrite = true;
	material.stencilRef = 1;
	material.stencilFunc = THREE.AlwaysStencilFunc;
	material.stencilZPass = THREE.ReplaceStencilOp;

	injectPlugin('portal', ({ ref }) => {
		let currentRef = ref;

		if (ref.isMesh === false) return;
		if (ref.uuid === portal.uuid) return;

		const setStencilProps = (mesh: THREE.Mesh) => {
			const { material } = mesh;

			if (material instanceof THREE.Material) {
				material.stencilWrite = true;
				material.stencilRef = 1;
				material.stencilFunc = THREE.EqualStencilFunc;
			}
		};

		setStencilProps(ref);

		return {
			onRefChange: (ref) => {
				currentRef = ref;
				setStencilProps(currentRef);
			},
			onPropsChange: () => {
				setStencilProps(currentRef);
			}
		};
	});
</script>

<T is={portal}>
	<T is={material} />
	<T.PlaneGeometry />
</T>

<slot />
