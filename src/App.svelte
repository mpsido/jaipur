<script>
	import Game from './Game.svelte';
    import { startGame } from './helper.js';
    let gameStarted = false;
    let selectedPlayer = 0;
    let gameRoom = "";
</script>
<svelte:head>
  <title>Jaipur</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="en" />
</svelte:head>
  
  <main>
    <body>
        {#if gameStarted && selectedPlayer != 0 && gameRoom != "" }
            <Game gameRoom={gameRoom} selectedPlayer={selectedPlayer}/>
        {:else}
            <h1>Jaipur</h1>
            <h4>Welcome to the market</h4>
            <label for="playerSelect"><b>Select Player:</b></label>
            <input type="number" id="playerSelect" min="1" max="2" on:input={(e) => {
                selectedPlayer = parseInt(e.target.value);
            }}/>
            <label for="gameRoom"><b>Game room:</b></label>
            <input type="string" id="gameRoom" on:input={(e) => {
                gameRoom = e.target.value;
            }}/>
            <button disabled={selectedPlayer == 0 || gameRoom == ""} type="submit" on:click={() => {
                startGame(gameRoom);
                gameStarted = true;
            }}>Start Game</button>
        {/if}
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
  
  </style>
  