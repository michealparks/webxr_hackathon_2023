<script lang='ts'>
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { XR, Controller, Hand } from '@threlte/xr'
</script>

<XR frameRate={72}>
	<Controller left />
	<Controller right />

	<Hand left />
	<Hand right />

	<T.PerspectiveCamera slot="fallback" makeDefault position={[0, 0, 5]}>
		<OrbitControls />
	</T.PerspectiveCamera>
</XR>
