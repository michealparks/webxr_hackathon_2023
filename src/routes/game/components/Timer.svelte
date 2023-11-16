<script lang='ts'>
  import { Text } from '@threlte/extras'
  import { gameState } from '$lib/state'
	import { onMount } from 'svelte'
	import { useFrame } from '@threlte/core'

  let start = 0
  let time = 0

  // Create a new Date object using the regular timestamp
  const date = new Date();

  // Use Intl.DateTimeFormat to format the date and time
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  }).format(date);

  onMount(() => {
    start = performance.now()

  })

  useFrame(() => {
    const now = performance.now()
    time = now - start
    date.setMilliseconds(time)
  })

  $: score = gameState.score
  $: text = `Score: ${$score}`
</script>

<Text
  userData={{ portal: false }}
  {text}
  position={[-0.2, 0.85, 0.1]}
  on:create={({ ref }) => console.log(ref)}
/>
