<script lang='ts'>
  import { T } from '@threlte/core'
  import { useGltf } from '@threlte/extras'
  import TargetModel from './TargetModel.svelte'
  const gltf = useGltf('target.glb')

  export let delay = 0
</script>

<T.Group {...$$restProps}>
  <TargetModel {delay} />
</T.Group>
