import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Card } from '../types/card.type';

const getCardsFromLocalStorage = () => JSON.parse(localStorage.getItem('cards')!) || [];

// Get the value out of storage on load.
const storedCards = browser ? getCardsFromLocalStorage() : [];

export const cardStore = writable<Card[]>(storedCards);

if (browser) {
	// Subscribe for any changes in other browser tabs
	window.onstorage = () => cardStore.set(getCardsFromLocalStorage());

	// Dump values to localStorage on every update
	cardStore.subscribe((value: Card[]) => localStorage.setItem('cards', JSON.stringify(value)));
}
