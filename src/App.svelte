<script>

	let cards = [
		{ cardType: 'gold-card' },
		{ cardType: 'silver-card' },
		{ cardType: 'cloth-card' },
		{ cardType: 'leather-card'  }
	];

	let deckCards = [
		{ cardType: 'spice-card' },
		{ cardType: 'gold-card' },
		{ cardType: 'diamond-card' },
		{ cardType: 'camel-card' },
		{ cardType: 'camel-card' },
	];

  let tokens = [
    { tokenType: 'diamond-token', rupiah: 5 },
    { tokenType: 'gold-token', rupiah: 5 },
    { tokenType: 'silver-token', rupiah: 5 },
    { tokenType: 'cloth-token', rupiah: 1 },
    { tokenType: 'spice-token', rupiah: 1 },
    { tokenType: 'leather-token', rupiah: 1 },
    { tokenType: 'bonus-token', rupiah: 1 },
  ];
</script>

<main>
  <body>
    <!-- tokens: -->
    <div id="board" style="display: block;">
      {#each tokens as { tokenType }}
        <div class="{tokenType} token"></div>
      {/each}
    </div>
    <!-- Board: -->
    <div id="board" style="display: block;">
      {#each deckCards as { cardType }}
        <div class="{cardType} card"></div>
      {/each}
    </div>
    <!-- Player's card: -->
    <div id="playerCards">
      {#each cards as { cardType }}
        <div class="{cardType} card"></div>
      {/each}
    </div> 
  </body>
</main>

<style>
body {
  background-image: radial-gradient(circle at 29% 55%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 4%,transparent 4%, transparent 44%,transparent 44%, transparent 100%),radial-gradient(circle at 85% 89%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 52%,transparent 52%, transparent 100%),radial-gradient(circle at 6% 90%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 53%,transparent 53%, transparent 64%,transparent 64%, transparent 100%),radial-gradient(circle at 35% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 6%,transparent 6%, transparent 98%,transparent 98%, transparent 100%),radial-gradient(circle at 56% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 16%,transparent 16%, transparent 23%,transparent 23%, transparent 100%),radial-gradient(circle at 42% 0%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 3%,transparent 3%, transparent 26%,transparent 26%, transparent 100%),radial-gradient(circle at 29% 28%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 75%,transparent 75%, transparent 100%),radial-gradient(circle at 77% 21%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 35%,transparent 35%, transparent 55%,transparent 55%, transparent 100%),radial-gradient(circle at 65% 91%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 46%,transparent 46%, transparent 76%,transparent 76%, transparent 100%),linear-gradient(45deg, rgb(83, 91, 235),rgb(76, 11, 174));
  min-height:400px;
  padding:20px;
  color:#DDDDDD;
  font-family:verdana;
}

#board, #playerCards {
  display: block;
  clear: both;
  width:100%;
  min-height: 240px;
}

.card {
  box-sizing: border-box;
  width: 150px;
  height: 214px;
  margin: 10px;
  float: left;
  background-color: white;
  background-position-x: 0px;
  background-position-y: center;
  background-repeat: none;
  background-position: middle center;  
  border: 1px #555555 solid;
  border-radius: 10px;
    -webkit-box-shadow: 2px 2px 3px 0px #000000; 
  box-shadow: 2px 2px 3px 0px #000000; 
}

.token {
  border-radius: 100px;
  background-color: white;
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
  background-image: url("public/diamond-card.png");
  background-size: 150px;
}

.gold-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_3419b03474ee44fba25c673ebf53694d~mv2_d_1488_2079_s_2.png/v1/fill/w_136,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Or.png"); */
  background-image: url("public/gold-card.png");
  background-size: 150px;
}

.silver-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_2d9f1e4703ed46aebc80980840bc37b8~mv2_d_1488_2079_s_2.png/v1/fill/w_134,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Argent.png"); */
  background-image: url("public/silver-card.png");
  background-size: 150px;
}

.cloth-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_a7ba72999b804d61862fd723b2c84da1~mv2_d_1488_2079_s_2.png/v1/fill/w_134,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Tissus.png"); */
  background-image: url("public/cloth-card.png");
  background-size: 150px;
}

.spice-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_65e3ccfbcdfd4831b1369643ffc74d1f~mv2_d_1488_2079_s_2.png/v1/fill/w_132,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Th%C3%A9.png"); */
  background-image: url("public/spice-card.png");
  background-size: 150px;
}

.leather-card {
  background-image: url("https://static.wixstatic.com/media/59baa2_2563b66ddd3f4c14b31aa735792a6b19~mv2_d_1488_2079_s_2.png/v1/fill/w_134,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Cuir.png");
  background-image: url("public/leather-card.png");
  background-size: 150px;
}

.camel-card {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_867f49c8664649ff819b5228c938d628~mv2_d_1488_2079_s_2.png/v1/fill/w_136,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Jaipur_Chameau.png"); */
  background-image: url("public/camel-card.png");
  background-size: 150px;
}

.diamond-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_c51d6199e67d424bbb3d8e1bf6b988e6~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/DIAMANT_5.png"); */
  background-image: url("public/diamond-token.png");
  background-size: 80px;
}

.gold-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_8459a514688d47adb7966ef0988fd557~mv2.png/v1/crop/x_0,y_9,w_626,h_613/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/OR_5.png"); */
  background-image: url("public/gold-token.png");
  background-size: 80px;
}

.silver-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_676989f40cbf4f6ea891d9da7e4e6442~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SILVER_5.png"); */
  background-image: url("public/silver-token.png");
  background-size: 80px;
}

.cloth-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_6c9ad9fe19ee4d158aad081beb5ebf88~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/TISSUS_1.png"); */
  background-image: url("public/cloth-token.png");
  background-size: 80px;
}

.spice-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_94ce9598cb7644e58446685d8a1a6036~mv2.png/v1/crop/x_0,y_5,w_626,h_621/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/THE_1.png"); */
  background-image: url("public/spice-token.png");
  background-size: 80px;
}

.leather-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_9e142953fbcd42d6a75b6c6ffb0b3689~mv2.png/v1/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/CUIR_1.png"); */
  background-image: url("public/leather-token.png");
  background-size: 80px;
}

.bonus-token {
  /* background-image: url("https://static.wixstatic.com/media/59baa2_28fbe92a9aad44b7bd10acf4d741375e~mv2.png/v1/crop/x_0,y_13,w_626,h_613/fill/w_82,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BONUS_5.png"); */
  background-image: url("public/bonus-token.png");
  background-size: 80px;
}

</style>
