<script>
  import { 
    handCards,
    boardCards,
    selectFromBoard,
    selectFromHand,
    tokens,
  } from './game.js';
  import { getGame, action } from "./helper.js";

  const readGameState = (gameState) => {
    console.log("gameState", gameState);
    $boardCards = gameState.board;
    $handCards = gameState.player1State.cards;
  };
  let gameStatePromise = getGame("momo");
  gameStatePromise.then(readGameState);

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

  const clearSelection = () => {
    $handCards = unselectAll($handCards);
    $selectFromHand = false;
    $boardCards = unselectAll($boardCards);
    $selectFromBoard = false;
  };

  const playTurn = async (boardCards, handCards, nbSelectedCamels) => {
    const actionResult = await action("momo", "1", {
      boardCards,
      handCards,
      nbSelectedCamels: 0,
    });
    console.log("actionResult", actionResult);
    if (actionResult.errorMsg != "") {
      return { success: false, board: [], hand: []};
    }
    console.log("consumedCamels", actionResult.consumedCamels);
    console.log("sale", actionResult.selling);
    console.log("_boardCards", actionResult.board);
    console.log("_handCards", actionResult.hand);
    return { success: true, board: actionResult.board, hand: actionResult.hand};
  }

  const updateGame = async () => { 
    let turn = await playTurn($boardCards, $handCards, 0);
    console.log("After turn state is", turn);
    if (!turn.success) {
      console.log("Action failure");
      return;
    }
    console.log("Replacing hand", $handCards, turn.hand);
    console.log("Replacing board", $boardCards, turn.board);
    getGame("momo").then(readGameState);
    clearSelection();
  };

</script>

  {#await gameStatePromise}
    <p>...waiting</p>
  {:then gameState}
    <!-- tokens: -->
    <div id="market">
      {#each $tokens as { tokenType }}
        <div class="{tokenType} token"></div>
      {/each}
    </div>
    <!-- Board: -->
    <h4>Board:</h4>
    <div id="board">
      {#each $boardCards as card, i }
        <div class="{card.cardType} card {card.selected ? 'selected' : ''}" on:click={() => {
          $boardCards = toggleSelected($boardCards, i);
          $selectFromBoard = hasSelectedCards($boardCards);
          console.log("$selectFromBoard", $selectFromBoard);
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
    {#if ($selectFromBoard && $selectFromHand)}
	    <button on:click={() => updateGame()}>Exchange</button>
    {:else if ($selectFromBoard)}
      <button on:click={() => updateGame()}>Take</button>
    {:else if ($selectFromHand)}
        <button on:click={() => updateGame()}>Sell</button>
    {:else}
      <button disabled={true}>Exchange/Take</button>
    {/if}
    <button on:click={clearSelection}>Clear</button>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}

<style>

#board, #handCards, #market {
  display: table-row;
  clear: both;
  width: 100%;
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
  float: left;
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

.bonus5-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_28fbe92a9aad44b7bd10acf4d741375e~mv2.png/v1/crop/x_0,y_13,w_626,h_613/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BONUS_5.png"); */
  background-image: url("bonus5-token.png");
  background-size: 80px;
}

.bonus4-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_d45fd9fe99484a9ca815588e698854e9~mv2.png/v1/crop/x_5,y_5,w_621,h_621/fill/w_80,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BONUS_4.png"); */
  background-image: url("bonus4-token.png");
  background-size: 80px;
}

.bonus3-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_5c7af1924dfa483c937b7869cbb41876~mv2.png/v1/fill/w_80,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BONUS_3.png"); */
  background-image: url("bonus3-token.png");
  background-size: 80px;
}

</style>
