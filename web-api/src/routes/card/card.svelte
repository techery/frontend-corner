<script>
	import Barcode from '$lib/barcode/Barcode.svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	export let cardId = '';
	export let title = '';
	export let value = '';

	const dispatch = createEventDispatcher();

	let container;
	let isIntersecting = false;
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			isIntersecting = entries[0].isIntersecting;
			if (isIntersecting) {
				console.log(`Intersection detected on ${title}`);
				observer.unobserve(container);
			}
		});

		observer.observe(container);
		return () => observer.unobserve(container);
	});
</script>

<div class="card-item" bind:this={container}>
	<span on:click={() => dispatch('remove', { id: cardId })}>X</span>
	<h3>{title}</h3>

	{#if isIntersecting}
		<Barcode {value} elementTag="svg" />
	{/if}
</div>

<style>
	.card-item {
		min-height: 330px;
	}

	span {
		float: right;
		margin: 10px;
		cursor: pointer;
	}

	:global(svg) {
		width: 100%;
		height: auto;
	}
</style>
