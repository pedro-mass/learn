<script lang="ts">
	// global styles
	import '../app.css'

	import { page } from '$app/stores'

	$: console.log($page.data)
</script>

<svelte:head>
	<title>{$page.data.post?.title}</title>
</svelte:head>

<nav>
	<a href="/">Home</a>
	<a href="/posts">Posts</a>
</nav>

<slot />
