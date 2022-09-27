<script>
  import { 
    handCards,
    boardCards,
    selectFromBoard,
    selectFromHand,
    tokens,
    playerTokens,
    nbSelectedCamels,
    nbCamels,
    yourTurn,
    otherPlayerHand,
    otherPlayerCamels,
    gameOver,
  } from './game.js';
  import { websocketUrl } from "./constants";
  import { getGame, action, restartGame } from "./helper.js";
  import { connect } from "./websocket";
	export let gameRoom;
	export let selectedPlayer;
  if (gameRoom !== "") {
    const ws = connect(websocketUrl, gameRoom, selectedPlayer, (event) => {
      console.log("Received game state (before parsing)", event, event.data);
      const gs = JSON.parse(event.data);
      console.log("Received game state", gs);
      const msgType = gs.msgType;
      if (!msgType) {
          console.log("msgType is missing");
          return;
      }
      switch (msgType) {
        case "gameState":
          readGameState(gs);
          break;
        case "error":
          alert(gs.error);
          break;
      }
    });
  }

  const readGameState = (gameState) => {
    console.log("gameState", gameState);
    $boardCards = gameState.board;
    $handCards = gameState.playersState[selectedPlayer - 1].cards;
    $otherPlayerHand = gameState.playersState[selectedPlayer % 2].cards;
    $nbCamels = gameState.playersState[selectedPlayer - 1].nbCamels;
    $playerTokens = gameState.playersState[selectedPlayer - 1].tokens;
    $tokens = gameState.tokenBoard;
    $yourTurn = (gameState.nextPlayerPlaying == selectedPlayer);
    $otherPlayerCamels = gameState.playersState[selectedPlayer % 2].nbCamels;
    $gameOver = gameState.gameOver;
    clearSelection();
    if ($gameOver) {
      alert(`Game over:
      Player 1 score: ${gameState.playersState[0].score}
      Player 2 score: ${gameState.playersState[1].score}`);
    }
  };
  let gameStatePromise = getGame(gameRoom, selectedPlayer);
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
    $nbSelectedCamels = 0;
  };

  const takeCamels = async () => {
    clearSelection();
    await playTurn(
      $boardCards,
      $handCards,
      $nbSelectedCamels,
      true,
    );
  };

  const playTurn = async (boardCards, handCards, nbSelectedCamels, takeCamels) => {
    try {
      const actionResult = await action(gameRoom, selectedPlayer, {
        boardCards,
        handCards,
        nbSelectedCamels,
        takeCamels,
      });
      console.log("actionResult", actionResult);
      if (!actionResult || actionResult.errorMsg === undefined || actionResult.errorMsg != "") {
        alert(actionResult.errorMsg);
        return { success: false, board: [], hand: []};
      }
      console.log("consumedCamels", actionResult.consumedCamels);
      console.log("sale", actionResult.selling);
      console.log("_boardCards", actionResult.board);
      console.log("_handCards", actionResult.hand);
      return { success: true, board: actionResult.board, hand: actionResult.hand};
    } catch (err) {
      console.log("Action error", err);
      alert(err);
    }
  }

  const updateGame = async () => { 
    let turn = await playTurn($boardCards, $handCards, $nbSelectedCamels, false);
    console.log("After turn state is", turn);
    if (!turn.success) {
      console.log("Action failure");
      return;
    }
    console.log("Replacing hand", $handCards, turn.hand);
    console.log("Replacing board", $boardCards, turn.board);
    clearSelection();
  };

</script>

  {#await gameStatePromise}
    <p>...waiting</p>
  {:then gameState}
    <!-- tokens: -->
    <div id="market">
      {#each Object.keys($tokens) as tokenType}
        <div class="{tokenType} token">
          <p><b>{$tokens[tokenType].slice(0, -4)}
            {$tokens[tokenType].slice(-4)}</b></p>
        </div>
      {/each}
    </div>
    <!-- Your turn -->
    <h2>Player {selectedPlayer}</h2>
    {#if ($yourTurn)}
    <h2>Your turn !</h2>
    {/if}
    <!-- Other Player's card: -->
    <h4>Opponent's cards:</h4>
    <div id="handCards">
      {#each $otherPlayerHand as card }
        <div class="{card.cardType} opponent"></div>
      {/each}
      <div id="camelSelect" class="mini-camel-card herd"><h2>{$otherPlayerCamels} x</h2></div>
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
    <div id="camelCards">
      <div id="camelSelect" class="mini-camel-card herd" on:click={() => {
        if ($nbSelectedCamels < $nbCamels) {
          $nbSelectedCamels += 1;
          return;
        }
        alert("No more camels");
      }}><h2>{$nbCamels} x</h2></div>
      <label for="camelSelect"><b>Exchange {$nbSelectedCamels} camels</b></label>
    </div>
    <button on:click={takeCamels}>Take Camels</button>
    {#if ($selectFromBoard && ($selectFromHand || $nbSelectedCamels > 0))}
	    <button on:click={() => updateGame()}>Exchange</button>
    {:else if ($selectFromBoard && (!$selectFromHand || $nbSelectedCamels == 0))}
      <button on:click={() => updateGame()}>Take</button>
    {:else if ($selectFromHand && !$selectFromBoard)}
        <button on:click={() => updateGame()}>Sell</button>
    {:else}
      <button disabled={true}>Exchange/Take</button>
    {/if}
    <button on:click={clearSelection}>Clear</button>
    <div id="myTokens">
      {#each Object.keys($playerTokens) as tokenType}
        <div class="{tokenType} token">
          <p><b>{$playerTokens[tokenType].slice(0, -4)}
            {$playerTokens[tokenType].slice(-4)}</b></p>
        </div>
      {/each}
    </div>
    {#if $gameOver}
      <button on:click={() => {
        restartGame(gameRoom).then(() => {
          gameStatePromise = getGame(gameRoom, selectedPlayer).then(readGameState);
        })
      }}>Restart</button>
    {/if}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}

<style>

#board, #handCards {
  display: table-row;
  clear: both;
  width: 100%;
}

#market, #myTokens {
  color: black;
  font-style: bold;
  font-size: 11px;
}

#camelCards {
  display: table-row;
  width: 20%;
  background-size: 40px;
  text-align: right;
}

.selected {
  border: 5px solid;
  padding: 5px;
  border-color: #05330d;
}

.card {
  box-sizing: border-box;
  width: 100px;
  height: 140px;
  margin: 10px;
  float: left;
  background-position-x: 0px;
  background-position-y: center;
  background-repeat: none;
  background-position: middle center;
  border-radius: 10px;
}

.opponent {
  box-sizing: border-box;
  width: 60px;
  height: 80px;
  margin: 10px;
  float: right;
  background-position-x: center;
  background-position-y: center;
  background-repeat: none;
  background-position: middle center;
  border-radius: 10px;
  color: black;
}

.herd {
  box-sizing: border-box;
  width: 60px;
  height: 80px;
  margin: 10px;
  float: right;
  background-position-x: center;
  background-position-y: center;
  background-repeat: none;
  background-position: middle center;
  border-radius: 10px;
  color: black;
}

.token {
  border-radius: 100px;
  width: 60px;
  height: 60px;
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
  background-size: 100px;
}

.gold-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_3419b03474ee44fba25c673ebf53694d~mv2_d_1488_2079_s_2.png/v1/fill/w_136,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Or.png"); */
  background-image: url("gold-card.png");
  background-size: 100px;
}

.silver-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_2d9f1e4703ed46aebc80980840bc37b8~mv2_d_1488_2079_s_2.png/v1/fill/w_134,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Argent.png"); */
  background-image: url("silver-card.png");
  background-size: 100px;
}

.cloth-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_a7ba72999b804d61862fd723b2c84da1~mv2_d_1488_2079_s_2.png/v1/fill/w_134,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Tissus.png"); */
  background-image: url("cloth-card.png");
  background-size: 100px;
}

.spice-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_65e3ccfbcdfd4831b1369643ffc74d1f~mv2_d_1488_2079_s_2.png/v1/fill/w_132,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Th%C3%A9.png"); */
  background-image: url("spice-card.png");
  background-size: 100px;
}

.leather-card {
  background-image: url("https://static.wixstatic.com/media/59baa2_2563b66ddd3f4c14b31aa735792a6b19~mv2_d_1488_2079_s_2.png/v1/fill/w_134,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Cuir.png");
  background-image: url("leather-card.png");
  background-size: 100px;
}

.camel-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_867f49c8664649ff819b5228c938d628~mv2_d_1488_2079_s_2.png/v1/fill/w_136,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Chameau.png"); */
  background-image: url("camel-card.png");
  background-size: 100px;
}

.jaipur-card {
  background-image: url("jaipur-card.png");
  background-size: 60px;
}

.mini-camel-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_867f49c8664649ff819b5228c938d628~mv2_d_1488_2079_s_2.png/v1/fill/w_136,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Chameau.png"); */
  background-image: url("camel-card.png");
  background-size: 60px;
}

.diamond-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_c51d6199e67d424bbb3d8e1bf6b988e6~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/DIAMANT_5.png"); */
  background-image: url("diamond-token.png");
  background-size: 60px;
}

.gold-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_8459a514688d47adb7966ef0988fd557~mv2.png/v1/crop/x_0,y_9,w_626,h_613/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/OR_5.png"); */
  background-image: url("gold-token.png");
  background-size: 60px;
}

.silver-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_676989f40cbf4f6ea891d9da7e4e6442~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SILVER_5.png"); */
  background-image: url("silver-token.png");
  background-size: 60px;
}

.cloth-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_6c9ad9fe19ee4d158aad081beb5ebf88~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/TISSUS_1.png"); */
  background-image: url("cloth-token.png");
  background-size: 60px;
}

.spice-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_94ce9598cb7644e58446685d8a1a6036~mv2.png/v1/crop/x_0,y_5,w_626,h_621/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/THE_1.png"); */
  background-image: url("spice-token.png");
  background-size: 60px;
}

.leather-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_9e142953fbcd42d6a75b6c6ffb0b3689~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/CUIR_1.png"); */
  background-image: url("leather-token.png");
  background-size: 60px;
}

.bonus5-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_28fbe92a9aad44b7bd10acf4d741375e~mv2.png/v1/crop/x_0,y_13,w_626,h_613/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BONUS_5.png"); */
  background-image: url("bonus5-token.png");
  background-size: 60px;
}

.bonus4-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_d45fd9fe99484a9ca815588e698854e9~mv2.png/v1/crop/x_5,y_5,w_621,h_621/fill/w_80,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BONUS_4.png"); */
  background-image: url("bonus4-token.png");
  background-size: 60px;
}

.bonus3-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_5c7af1924dfa483c937b7869cbb41876~mv2.png/v1/fill/w_80,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BONUS_3.png"); */
  background-image: url("bonus3-token.png");
  background-size: 60px;
}

.camel-token {
  background-image: url("camel-token.png");
  background-size: 60px;
}

</style>
