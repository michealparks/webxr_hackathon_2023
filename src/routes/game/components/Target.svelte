<script lang='ts'>
  import { useGltf } from '@threlte/extras'
  import TargetModel from './TargetModel.svelte'

  const gltf = useGltf('target.glb')

  $: console.log($gltf)
</script>

<TargetModel />