<script lang="ts">
	import { cardStore } from '../../stores/cards';
	import Barcode from '../../lib/barcode/Barcode.svelte';

	const removeItem = (idToRemove: number): void => {
		$cardStore = $cardStore.filter(({ id }) => id !== idToRemove);
	};
</script>

<svelte:head>
	<title>Card list</title>
</svelte:head>

<div>
	{#if $cardStore.length}
		<ul>
			{#each $cardStore as { id, title, value }}
				<li>
					<span on:click={() => removeItem(id)}>X</span>
					<h3>{title}</h3>
					<Barcode {value} elementTag="svg" options={{}} />
				</li>
			{/each}
		</ul>
	{:else}
		<h2>You don't have any cards yet :(</h2>
	{/if}
</div>

<style>
	ul {
		margin: 0;
		padding: 0;
		display: grid;
		row-gap: 50px;
		justify-content: space-between;
		grid-template-columns: repeat(4, 200px);
	}

	@media (max-width: 800px) {
		ul {
			grid-template-columns: repeat(1, 100%);
		}
	}

	li {
		list-style: none;
		border: 1px solid black;
	}

	li span {
		float: right;
		margin: 10px;
		cursor: pointer;
	}

	li :global(svg) {
		width: 100%;
		height: auto;
	}
</style>
