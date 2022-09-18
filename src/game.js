
import { writable } from 'svelte/store';

export let handCards = writable([]);
export let boardCards = writable([]);
export let selectFromBoard = writable(false);
export let selectFromHand = writable(false);

export let tokens = writable([
    { tokenType: 'diamond-token', rupiah: 5 },
    { tokenType: 'gold-token', rupiah: 5 },
    { tokenType: 'silver-token', rupiah: 5 },
    { tokenType: 'cloth-token', rupiah: 1 },
    { tokenType: 'spice-token', rupiah: 1 },
    { tokenType: 'leather-token', rupiah: 1 },
    { tokenType: 'bonus5-token', rupiah: 1 },
    { tokenType: 'bonus4-token', rupiah: 1 },
    { tokenType: 'bonus3-token', rupiah: 1 },
  ]);
