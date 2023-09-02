<script lang="ts">
	export let onStart: () => any
</script>

<h1>Matching game</h1>
<button on:click={onStart}>Play</button>

<style>
	button {
		background-color: #4caf50;
		border: none;
		color: white;
		padding: 15px 32px;
		margin: 10px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
	}
</style>
