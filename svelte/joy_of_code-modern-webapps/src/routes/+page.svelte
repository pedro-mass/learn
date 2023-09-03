<script lang="ts">
	import { onDestroy, onMount } from 'svelte'

	onMount(() => console.log('Mounted home page'))
	onDestroy(() => console.log('Unmounted home page'))
</script>

<h1>Home page</h1>
