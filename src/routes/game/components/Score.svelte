<script lang='ts'>
  import { Text } from '@threlte/extras'
  import { gameState } from '$lib/state'

  $: score = gameState.score
  $: text = `Score: ${$score}`
</script>

<Text
  userData={{ portal: false }}
  {text}
  position={[-0.2, 0.85, 0.1]}
  on:create={({ ref }) => console.log(ref)}
/>
