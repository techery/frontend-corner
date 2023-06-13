<script lang="ts">
	import Card from './card.svelte';
	import { cardStore } from '../../stores/cards';

	const removeItem = (event): void => {
		$cardStore = $cardStore.filter(({ id }) => id !== event.detail.id);
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
					<Card cardId={id} {title} {value} on:remove={removeItem} />
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
</style>
