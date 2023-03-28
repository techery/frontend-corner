<script lang="ts">
	import type { Card } from '../../../types/card.type';
	import { cardStore } from '../../../stores/cards';
	import { goto } from '$app/navigation';

	let title: string;
	let value: string;
	let errors: Record<string, Record<string, boolean>> = {};

	function isRequiredFieldValid(value) {
		return value != null && value !== '';
	}

	function validateForm(data: Card): boolean {
		let valid = true;

		['title', 'value'].forEach((input) => {
			const isEmpty = !isRequiredFieldValid(data[input]);
			errors[input] = { ...errors[input], isEmpty };

			if (isEmpty) {
				valid = false;
			}
		});

		return valid;
	}

	function onSubmit(e) {
		const newCard = Object.fromEntries(new FormData(e.target)) as Card;

		if (validateForm(newCard)) {
			const id = Math.random().toString(36).slice(2, 7);
			$cardStore = [...$cardStore, { ...newCard, id }];
			goto('/card');
		}
	}
</script>

<svelte:head>
	<title>Add new card</title>
</svelte:head>

<form on:submit|preventDefault={onSubmit}>
	<div>
		<label for="title">Card title</label>
		<input id="title" name="title" type="text" bind:value={title} />
		{#if errors.title && errors.title.isEmpty}
			<p class="error-message">Title is required</p>
		{/if}
	</div>
	<div>
		<label for="value">Card value</label>
		<input id="value" name="value" type="text" bind:value />
		{#if errors.value && errors.value.isEmpty}
			<p class="error-message">Value is required</p>
		{/if}
	</div>
	<div>
		<button type="submit">Add</button>
	</div>
</form>

<style>
	* {
		box-sizing: border-box;
	}

	form {
		margin: 100px auto;
		display: flex;
		flex-direction: column;
		width: 300px;
	}

	form > div {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	form > div + * {
		margin-top: 10px;
	}

	.error-message {
		color: tomato;
		flex: 0 0 100%;
		margin: 0 2px;
		font-size: 0.8em;
	}
</style>
