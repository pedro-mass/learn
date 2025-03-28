<script lang="ts">
	import PlayAgainButton from './PlayAgainButton.svelte'
	import Start from './Start.svelte'
	import { emoji } from './emoji'

	type State = 'start' | 'playing' | 'paused' | 'won' | 'lost'

	let state: State = 'start'
	let size = 20
	let grid = createGrid()

	// used to check if game is over
	let maxMatches = grid.length / 2

	// selected cards
	let selected: number[] = []
	// matched cards
	let matches: string[] = []

	function createGrid() {
		// only want unique cards
		let cards = new Set<string>()

		// half b/c we duplicate the cards
		let maxSize = size / 2

		while (cards.size < maxSize) {
			// pick random emoji
			const randomIndex = Math.floor(Math.random() * emoji.length)
			cards.add(emoji[randomIndex])
		}

		// duplicate and shuffle cards
		return shuffle([...cards, ...cards])
	}

	function shuffle<Items>(array: Items[]) {
		return array.sort(() => Math.random() - 0.5)
	}

	function selectCard(cardIndex: number) {
		selected = selected.concat(cardIndex)
	}

	function matchCards() {
		const [first, second] = selected

		if (grid[first] === grid[second]) {
			matches = matches.concat(grid[first])
		}

		setTimeout(() => (selected = []), 300)
	}
	$: selected.length === 2 && matchCards()

	function gameWon() {
		state = 'won'
		resetGame()
	}
	$: maxMatches === matches.length && gameWon()

	let timerId: number | null = null
	let time = 60
	function startGameTimer() {
		function countdown() {
			state !== 'paused' && (time -= 1)
		}
		timerId = setInterval(countdown, 1000)
	}
	function gameLost() {
		state = 'lost'
		resetGame()
	}
	$: if (state === 'playing') {
		!timerId && startGameTimer()
	}
	$: time === 0 && gameLost()

	function resetGame() {
		timerId && clearInterval(timerId)
		timerId && clearInterval(timerId)
		grid = createGrid()
		maxMatches = grid.length / 2
		selected = []
		matches = []
		timerId = null
		time = 60
	}

	function pauseGame(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			switch (state) {
				case 'playing':
					state = 'paused'
					break
				case 'paused':
					state = 'playing'
					break
			}
		}
	}
</script>

<svelte:window on:keydown={pauseGame} />

{#if state === 'paused'}
	<div class="full-centered">
		<h1>Game Paused</h1>
	</div>
{/if}

{#if state === 'start'}
	<div class="full-centered">
		<Start onStart={() => (state = 'playing')} />
	</div>
{/if}

{#if state === 'playing'}
	<h1 class="timer" class:pulse={time <= 10}>
		{time}
	</h1>

	<div class="matches">
		{#each matches as match}
			<div>{match}</div>
		{/each}
	</div>

	<div class="cards">
		{#each grid as card, cardIndex}
			{@const isSelected = selected.includes(cardIndex)}
			{@const isSelectedOrMatch = selected.includes(cardIndex) || matches.includes(card)}
			{@const match = matches.includes(card)}

			<button
				class="card"
				class:selected={isSelected}
				class:flip={isSelectedOrMatch}
				disabled={isSelectedOrMatch}
				on:click={() => selectCard(cardIndex)}
			>
				<div class="back" class:match>{card}</div>
			</button>
		{/each}
	</div>
{/if}

{#if state === 'lost'}
	<div class="full-centered">
		<h1>You lost! 💩</h1>
		<PlayAgainButton onPlayAgain={() => (state = 'playing')} />
	</div>
{/if}

{#if state === 'won'}
	<div class="full-centered">
		<h1>You win! 🎉</h1>
		<PlayAgainButton onPlayAgain={() => (state = 'playing')} />
	</div>
{/if}

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.4rem;
	}

	.card {
		height: 140px;
		width: 140px;
		font-size: 4rem;
		background-color: var(--bg-2);
		transition: rotate 0.3s ease-out;
		transform-style: preserve-3d;

		&.selected {
			border: 4px solid var(--border);
		}

		&.flip {
			rotate: y 180deg;
			pointer-events: none;
		}

		& .back {
			position: absolute;
			inset: 0;
			display: grid;
			place-content: center;
			backface-visibility: hidden;
			rotate: y 180deg;
		}

		& .match {
			transition: opacity 0.3s ease-in-out;
			opacity: 0.4;
		}
	}

	.matches {
		display: flex;
		gap: 1rem;
		margin-block: 2rem;
		font-size: 3rem;
		justify-content: center;
		min-height: 3rem;
	}

	.timer {
		text-align: center;
		transition: color 0.3s ease;
	}

	.pulse {
		color: var(--pulse);
		animation: pulse 1s infinite ease;
	}

	@keyframes pulse {
		to {
			scale: 1.4;
		}
	}

	.full-centered {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		text-align: center;
	}
</style>
