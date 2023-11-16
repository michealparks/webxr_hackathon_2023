<script lang='ts'>
  import { Text } from '@threlte/extras'
  import { gameState } from '$lib/state'

  $: score = gameState.score
</script>

<Text text={`${$score}`} />
