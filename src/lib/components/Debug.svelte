<script lang="ts">
	import { T } from '@threlte/core'
	import { Grid } from '@threlte/extras'

	let debug = true
</script>

{#if debug}
	<Grid />

	<T.AxesHelper />
{/if}
