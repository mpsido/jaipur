
import { writable } from 'svelte/store';
import { shuffleArray } from "./utils.js";

export let handCards = writable([]);
export let deckCards = writable([]);
export let selectFromDeck = writable(false);
export let selectFromHand = writable(false);

const deckParameters = {
    "diamond": 6,
    "gold": 6,
    "silver": 6,
    "cloth": 8,
    "spice": 8,
    "leather": 10,
    "camel": 11,
}
const maxCardsInHand = 7;
const saleQuotas = {
    "diamond-card": 2,
    "gold-card": 2,
    "silver-card": 3,
    "cloth-card": 3,
    "spice-card": 4,
    "leather-card": 4,
};

export let tokens = writable([
    { tokenType: 'diamond-token', rupiah: 5 },
    { tokenType: 'gold-token', rupiah: 5 },
    { tokenType: 'silver-token', rupiah: 5 },
    { tokenType: 'cloth-token', rupiah: 1 },
    { tokenType: 'spice-token', rupiah: 1 },
    { tokenType: 'leather-token', rupiah: 1 },
    { tokenType: 'bonus-token', rupiah: 1 },
  ]);

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

const exchange = (_deckCards, _handCards, nbSelectedCamels) => {
    if (_deckCards.length != (_handCards.length + nbSelectedCamels)) {
        return [_deckCards, _handCards, "need to exchange same number of cards"];
    }
    return [_handCards, _deckCards, "", nbSelectedCamels];
};

const takeFromDeck = (_deckCards, _handCards, nbCardsInHand) => {
    if (_handCards.length > 0) {
        console.log("Hand", _deckCards);
        return [_deckCards, _handCards, "cannot take from deck when hand cards are selected", 0];
    }
    let allCamel = true;
    // check if taking only camels
    for (let card of _deckCards) {
        if (card.cardType != "camel-card") {
            allCamel = false;
            break
        }
    }
    // taking camels
    if (allCamel) {
        return [[], _handCards, "", 0, -_deckCards.length];
    }
    // if taking cards
    if (_deckCards.length > 3) {
        return [_deckCards, _handCards, "taking too much cards", 0];

    }
    if (nbCardsInHand + _deckCards.length > maxCardsInHand) {
        return [_deckCards, _handCards, "that would be too much cards in hand", 0];
    }
    // take cards
    return [[], [..._deckCards, ..._handCards], "", 0];
}

const sell = (_deckCards, _handCards, nbSelectedCamels) => {
    let sale = {
        type: "",
        qty: 0,
    };
    if (nbSelectedCamels > 0) {
        return [_deckCards, _handCards, "cannot sell camels", sale];
    }
    if (_deckCards.length > 0) {
        return [_deckCards, _handCards, "cannot sell deck cards", sale];
    }
    for (let card of _handCards) {
        if (sale.type != "" && card.cardType != sale.type) {
            return [_deckCards, _handCards, "can only sell one type of merchandise in one turn", sale];
        }
        if (sale.type == "") {
            sale.type = card.cardType;
            sale.qty = 1;
        }
        sale.qty += 1;
    }
    if (sale.type == "camel-card") {
        return [_deckCards, _handCards, "cannot sell camels", sale];
    }
    if (sale.qty < saleQuotas[sale.type]) {
        return [_deckCards, _handCards, "not selling enough", sale];
    }
    return [_deckCards, [], "", sale];
}

export const action = (_deckCards, _handCards, nbSelectedCamels) => {
    let selectedDeck = _deckCards.filter(card => card.selected);
    let selectedHand = _handCards.filter(card => card.selected);
    let remainingDeck = _deckCards.filter(card => !card.selected);
    let remainingHand = _handCards.filter(card => !card.selected);
    const selectFromDeck = selectedDeck.length > 0;
    const selectFromHand = selectedHand.length > 0;
    let putInDeck = [];
    let putInHand = [];
    let errorMsg = "";
    let consumedCamels = 0;
    let selling = {
        type: "",
        qty: 0,
    }
    if (selectFromDeck && selectFromHand) {
        [putInDeck, putInHand, errorMsg, consumedCamels] = exchange(selectedDeck, selectedHand, nbSelectedCamels);
        console.log("exchange", putInDeck, putInHand);
    }
    else if (selectedDeck) {
        [putInDeck, putInHand, errorMsg, consumedCamels] = takeFromDeck(selectedDeck, selectedHand, _handCards.length);
        console.log("takeFromDeck", putInDeck, putInHand);
    }
    else if (selectFromHand) {
        [putInDeck, putInHand, errorMsg, selling] = sell(selectedDeck, selectedHand, nbSelectedCamels);
        console.log("sell", putInDeck, putInHand);
    }
    if (errorMsg != "") {
        alert(errorMsg);
    }
    return [[...remainingDeck, ...putInDeck], [...remainingHand, ...putInHand], errorMsg, consumedCamels, selling];
}
