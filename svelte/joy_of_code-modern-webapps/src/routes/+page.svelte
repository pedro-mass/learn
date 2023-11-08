<script lang="ts">
	import { goto } from '$app/navigation'

	export let data

	$: ({ posts } = data)

	function search(event: Event) {
		const data = new FormData(event.target)
		const search = data.get('search')
		goto(`?search=${search}`, { replaceState: true, keepFocus: true })
	}
</script>

<form on:submit|preventDefault={search}>
	<input type="text" name="search" />
	<button type="submit">Search</button>
</form>

<h1>Posts</h1>

<p>Showing {posts.length} posts.</p>

<ul>
	{#each posts as { slug, title }}
		<li><a href="/posts/{slug}">{title}</a></li>
	{/each}
</ul>
