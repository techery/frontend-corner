import { writable } from "svelte/store";

export const active = writable<HomePageSection | null>(null);
