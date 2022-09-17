
import { writable } from 'svelte/store';
import { shuffleArray } from "./utils.js";

export let handCards = writable([]);
export let deckCards = writable([]);
export let selectFromDeck = writable(false);
export let selectFromHand = writable(false);

let deckParameters = {
    "diamond": 6,
    "gold": 6,
    "silver": 6,
    "cloth": 8,
    "spice": 8,
    "leather": 10,
    "camel": 11,
}


export function drawCards(deck, n) {
    return [deck.slice(0, n), deck.slice(n)];
}

export function makeDeck() {
    let deck = [];
    for (const cardCategory in deckParameters) {
      let nbCards = deckParameters[cardCategory];
      for (let i = 0; i < nbCards; i++) {
        deck = [...deck, { cardType: `${cardCategory}-card`, selected: false }];
      }
    }
    return shuffleArray(deck);
};
