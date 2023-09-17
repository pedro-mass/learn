<script lang="ts">
	export let data
</script>

<div class="layout">
	<aside>
		<nav>
			<h4>Posts</h4>

			<ul>
				{#each data.posts as { slug, title }}
					<li><a href="/posts/{slug}">{title}</a></li>
				{/each}
			</ul>
		</nav>
	</aside>

	<main>
		<slot />
	</main>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 200px minmax(auto, 60ch);
		gap: 4rem;
		margin-top: 2rem;
	}
</style>
