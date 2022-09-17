<script>
  import { 
    handCards,
    deckCards,
    makeDeck,
    drawCards,
    selectFromDeck,
    selectFromHand,
    action,
    tokens,
  } from './game.js';

  let deck = makeDeck();

  [$handCards, deck] = drawCards(deck, 5);

  [$deckCards, deck] = drawCards(deck, 5);

  const toggleSelected = (cards, i) => {
    cards[i].selected = !cards[i].selected;
    return cards;
  };

  const hasSelectedCards = (cards) => {
    for (let card of cards) {
      if (card.selected) {
        return true;
      }
    }
    return false;
  };

  const unselectAll = (cards) => {
    return cards.map(card => {return { ...card, selected: false }});
  };

  const playTurn = (deckCards, handCards, nbSelectedCamels) => {
    let [_deckCards, _handCards, errorMsg, consumedCamels, selling] = action(deckCards, handCards, nbSelectedCamels);
    if (errorMsg != "") {
      return { success: false, deck: [], hand: []};
    }
    console.log("consumedCamels", consumedCamels);
    console.log("sale", selling);
    console.log("_deckCards", _deckCards);
    console.log("_handCards", _handCards);
    return { success: true, deck: _deckCards, hand: _handCards};
  }

</script>

<main>
  <body>
    <h1>Jaipur</h1>
    <h4>Welcome to the market</h4>
    <!-- tokens: -->
    <div id="bank">
      {#each $tokens as { tokenType }}
        <div class="{tokenType} token"></div>
      {/each}
    </div>
    <!-- Board: -->
    <h4>Board:</h4>
    <div id="deck">
      {#each $deckCards as card, i }
        <div class="{card.cardType} card {card.selected ? 'selected' : ''}" on:click={() => {
          $deckCards = toggleSelected($deckCards, i);
          $selectFromDeck = hasSelectedCards($deckCards);
          console.log("$selectFromDeck", $selectFromDeck);
        }}></div>
      {/each}
    </div>
    <!-- Player's card: -->
    <h4>Player's card:</h4>
    <div id="handCards">
      {#each $handCards as card, i }
        <div class="{card.cardType} card {card.selected ? 'selected' : ''}" on:click={() => {
          $handCards = toggleSelected($handCards, i);
          $selectFromHand = hasSelectedCards($handCards);
          console.log("$selectFromHand", $selectFromHand);
        }}></div>
      {/each}
    </div> 
    {#if ($selectFromDeck && $selectFromHand)}
	    <button on:click={() => { 
        let turn = playTurn($deckCards, $handCards, 0);
        if (!turn.success) {
          return;
        }
        console.log("Replacing", $handCards, turn.hand);
        $handCards = turn.hand;
        $deckCards = turn.deck;
        }}>Exchange</button>
    {:else if ($selectFromDeck)}
      <button on:click={() => { 
        let turn = playTurn($deckCards, $handCards, 0);
        if (!turn.success) {
          return;
        }
        console.log("Replacing", $handCards, turn.hand);
        $handCards = turn.hand;
        $deckCards = turn.deck;
        }}>Take</button>
    {:else if ($selectFromHand)}
        <button on:click={() => { 
          let turn = playTurn($deckCards, $handCards, 0);
          if (!turn.success) {
            return;
          }
          console.log("Replacing", $handCards, turn.hand);
          $handCards = turn.hand;
          $deckCards = turn.deck;
          }}>Sell</button>
    {:else}
      <button disabled={true}>Exchange/Take</button>
    {/if}
    <button on:click={() => {
      $handCards = unselectAll($handCards);
      $selectFromHand = false;
      $deckCards = unselectAll($deckCards);
      $selectFromDeck = false;
    }}>Clear</button>
  </body>
</main>

<style>
body {
  background-image: radial-gradient(circle at 29% 55%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 4%,transparent 4%, transparent 44%,transparent 44%, transparent 100%),radial-gradient(circle at 85% 89%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 52%,transparent 52%, transparent 100%),radial-gradient(circle at 6% 90%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 53%,transparent 53%, transparent 64%,transparent 64%, transparent 100%),radial-gradient(circle at 35% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 6%,transparent 6%, transparent 98%,transparent 98%, transparent 100%),radial-gradient(circle at 56% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 16%,transparent 16%, transparent 23%,transparent 23%, transparent 100%),radial-gradient(circle at 42% 0%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 3%,transparent 3%, transparent 26%,transparent 26%, transparent 100%),radial-gradient(circle at 29% 28%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 75%,transparent 75%, transparent 100%),radial-gradient(circle at 77% 21%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 35%,transparent 35%, transparent 55%,transparent 55%, transparent 100%),radial-gradient(circle at 65% 91%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 46%,transparent 46%, transparent 76%,transparent 76%, transparent 100%),linear-gradient(45deg, rgb(3, 129, 52),rgb(40, 134, 30));
  min-height:400px;
  padding:20px;
  color:#DDDDDD;
  display: table-row;
  font-family:verdana;
}

#deck, #handCards, #bank {
  display: table-row;
  clear: both;
  width: 100%;
  min-height: 240px;
}

.selected {
  border: 5px solid;
  padding: 5px;
  border-color: #05330d;
}

.card {
  box-sizing: border-box;
  width: 150px;
  height: 214px;
  margin: 10px;
  float: left;
  background-position-x: 0px;
  background-position-y: center;
  background-repeat: none;
  background-position: middle center;
  border-radius: 10px;
}

.token {
  border-radius: 100px;
  width: 80px;
  height: 80px;
  margin: 0px;
  background-repeat: none;
  background-position: middle center;
  background-position-x: 0px;
  background-position-y: center; 
}

.diamond-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_670f0746d67b40ef84e05aae6bdce221~mv2_d_1488_2079_s_2.png/v1/fill/w_136,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Diamants_Modifs.png"); */
  background-image: url("diamond-card.png");
  background-size: 150px;
}

.gold-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_3419b03474ee44fba25c673ebf53694d~mv2_d_1488_2079_s_2.png/v1/fill/w_136,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Or.png"); */
  background-image: url("gold-card.png");
  background-size: 150px;
}

.silver-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_2d9f1e4703ed46aebc80980840bc37b8~mv2_d_1488_2079_s_2.png/v1/fill/w_134,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Argent.png"); */
  background-image: url("silver-card.png");
  background-size: 150px;
}

.cloth-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_a7ba72999b804d61862fd723b2c84da1~mv2_d_1488_2079_s_2.png/v1/fill/w_134,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Tissus.png"); */
  background-image: url("cloth-card.png");
  background-size: 150px;
}

.spice-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_65e3ccfbcdfd4831b1369643ffc74d1f~mv2_d_1488_2079_s_2.png/v1/fill/w_132,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Th%C3%A9.png"); */
  background-image: url("spice-card.png");
  background-size: 150px;
}

.leather-card {
  background-image: url("https://static.wixstatic.com/media/59baa2_2563b66ddd3f4c14b31aa735792a6b19~mv2_d_1488_2079_s_2.png/v1/fill/w_134,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Cuir.png");
  background-image: url("leather-card.png");
  background-size: 150px;
}

.camel-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_867f49c8664649ff819b5228c938d628~mv2_d_1488_2079_s_2.png/v1/fill/w_136,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Chameau.png"); */
  background-image: url("camel-card.png");
  background-size: 150px;
}

.diamond-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_c51d6199e67d424bbb3d8e1bf6b988e6~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/DIAMANT_5.png"); */
  background-image: url("diamond-token.png");
  background-size: 80px;
}

.gold-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_8459a514688d47adb7966ef0988fd557~mv2.png/v1/crop/x_0,y_9,w_626,h_613/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/OR_5.png"); */
  background-image: url("gold-token.png");
  background-size: 80px;
}

.silver-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_676989f40cbf4f6ea891d9da7e4e6442~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SILVER_5.png"); */
  background-image: url("silver-token.png");
  background-size: 80px;
}

.cloth-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_6c9ad9fe19ee4d158aad081beb5ebf88~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/TISSUS_1.png"); */
  background-image: url("cloth-token.png");
  background-size: 80px;
}

.spice-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_94ce9598cb7644e58446685d8a1a6036~mv2.png/v1/crop/x_0,y_5,w_626,h_621/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/THE_1.png"); */
  background-image: url("spice-token.png");
  background-size: 80px;
}

.leather-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_9e142953fbcd42d6a75b6c6ffb0b3689~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/CUIR_1.png"); */
  background-image: url("leather-token.png");
  background-size: 80px;
}

.bonus-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_28fbe92a9aad44b7bd10acf4d741375e~mv2.png/v1/crop/x_0,y_13,w_626,h_613/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BONUS_5.png"); */
  background-image: url("bonus-token.png");
  background-size: 80px;
}

</style>
