
import { writable } from 'svelte/store';

export let handCards = writable([]);
export let boardCards = writable([]);
export let selectFromBoard = writable(false);
export let selectFromHand = writable(false);
export let nbSelectedCamels = writable(0);

export let tokens = writable({});
export let playerTokens = writable({});
export let nbCamels = writable(0);
