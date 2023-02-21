# Jaipur

This code allows you to play the [Jaipur board game](https://en.wikipedia.org/wiki/Jaipur_\(card_game\)) online with your friends.

In order to play you need to start the frontend and the backend.

The backend is located in this repository: https://github.com/mpsido/jaipur-backend

After you started the game. Both player 1 and 2 need to run their webbrowser and go the url of the frontend app: http://localhost:5173/.

If you are alone and just want to test the game, it is also possible to open two tabs of the same webbrowser (or a different browser) on http://localhost:5173.

## How to start the frontend

```
git clone https://github.com/mpsido/jaipur.git
cd jaipur
npm start
```

## How to start the game

On the main screen select if you are playing with player 1 or 2 (player 1 always plays first) and the game room.

The game room is any string of characters you want.

The other player has to select a different player (choose 2 if the first player is playing player 1) and the **same game room**.

## How to play

### The goal of the game

The goal of the game is to become the richest merchant.

At the end of the game the winner is the merchant who earned the most rupees by selling merchandise.

### Definitions

**Board**: the cards in the middle visible by the two players

**Deck** : the cards of the pile that were not distributed in the game yet.

**Herd**: each player has a "herd" it is a stack of camel cards that do not count as cards in the hand. Each player can however use the camels of the herd as exchange currency when he is playing the "exchange" action.

### What you see on the screen

The top of the screen shows the values of the tokens that no player has obtained yet. For bonus tokens, it only shows the number of bonus tokens left.

Next, On the top you see how many cards your opponent has in his hands as well as how many camels he has.

On the middle you see the cards layed on the table: visible by both players

On the bottom you see your own cards and your herd of camels.

In the bottom of the screen you see the tokens that you have already obtained.

### When it is your turn

At every turn a player can perform one of the four possible actions:
* "**take camels**" the player takes all the camels in his hand and on the board and puts them in his herd
* "**exchange**" cards (can exchange as many cards as he want, one card for one card)
* "**take**" cards (take maxium 3 cards)
* "**sell**" merchandise

### Take camels

The player takes all the camels in his hand and on the board and puts them in his herd

### Exchange cards

You can exchange the cards in your hand or camels in your herd for the cards on the board.

One card for one card no matter what card it is. Be careful however you still cannot exceed 7 cards in your hand after the exchange !

### Take cards

You select up to three cards (1, 2 or 3) and they appear in your hand.

You cannot have more than 7 cards in your hand.

### Sell merchandise

You can only sell one type of merchandise but you can sell as many as you have in your hand.

When you sell merchandise you exchange each card you sell for one token of that category. The values of the token in rupees are visible at the top of the screen.

### Merchandise tokens

Each merchandise type corresponds to a merchandise token.

The values of those tokens in rupees are visible on the top the screen. Each merchandise you sell gives you one token. Those token are picked by decreasing order of their value.

At the beginning of the game the best tokens are (decresing value):
* diamond
* gold
* silver
* cloth
* spice
* leather

But as players sell merchandise and take the corresponding tokens the remaining token values may change that order of value. So make sure you check the values of the remaining tokens on the top of the screen.

### Bonus tokens

Bonus are tokens that are worth some extra rupees under certain conditions.

**Camel bonus**: at the end of the game, the player who has the highest number of camels in his herd gets that bonus token worth 5 rupees

Selling bonus tokens:

- **3 merchandise bonus**: when selling 3 merchandises of the same type in one **sell** action the player earns one of those token. The token is randomly picked among the bonus tokens of that category not taken already.
- **4 merchandise bonus**: when selling 4 merchandises of the same type in one **sell** action the player earns one of those token. The token is randomly picked among the bonus tokens of that category not taken already.
- **5 or more merchandise bonus**: when selling 5 or more merchandises of the same type in one **sell** action the player earns one of those token. The token is randomly picked among the bonus tokens of that category not taken already.

### Game end

The game ends when:
* there are no more cards in the deck to fill the board with 5 cards
* when three types of merchandise are sold out (no more tokens to exchange for that merchandise)

## Some information to help you read the code

This frontend has been coded using "Svelte" framework. If you are not familiar with it have a look at their documentation: https://svelte.dev/ and their tutorial: https://svelte.dev/tutorial/basics


* The welcome screen (where you select your player and game room) source code is in `App.svelte` file.
* The game screen (where you spend most of your time while you are playing the game) source code is in `Game.svelte` file.
* The functions that make REST API calls to the backend are in `helper.js`
* There is a websocket connection between the backend and the frontend: this is how each player's screen gets updated when the other player has played. The websocket message contains a structure with the "game state" that is read in `readGameState` function (`Game.svelte`).


## Do you want to participate ?

Here are a few things that could help a lot if you want to contribute or exercise with this project.

Some of those questions involve changes in both the backend and the frontend.

In any case, please make a merge request and fill the form here  https://forms.gle/GMY2s6KimeTjMw5e8 to email me your remarks and questions.


#### Easy questions:

* can you display the current score of each player on the screen
* can you display the number of cards left on the deck
* you can only see the number of bonus tokens left. Can you display the values of the remaining bonus tokens
* at the end of the game there is a button to restart the game, but you cannot change which player you are. Can you update the code in such a way that players can switch their side


#### Intermediate questions

* can you update the code to save the game state in a redis database (you can add a docker-compose.yml file to run the redis database locally)
* at the end of the game there is a button to restart the game, but you cannot change which player you are. Can you update the code in such a way that players can switch their side
* can you encrypt the communication between the frontend and the backend using wss (websocket with SSL encryption)
* can you make the game frontend compatible to phone screens


#### Advanced questions:

* right now there is no protection of any sort can you configure user access management using [auth0](https://auth0.com/). Document in a markdown file all the necessary configuration steps on auth0.
* at the moment anyone can claim to be any player on any game room (and can see the cards in the hand of the opponent). Can you update the code in such a way that once a game room has a player connected he has a unique session token that identifies him (you can use a system of unguessable random id generation). Only the player with that token can connect to that room with that player id. Warning ! Keep in mind that after a game is over in a game room you may want to switch which player you are
* in order to make communication more compact (and faster) between frontend and backend: can you compress the information in the game state structure. Consider using a binary buffer: https://protobuf.dev/

## Do you have questions ?

If you have a question or suggestion you can reach out to me using this google form:

https://forms.gle/GMY2s6KimeTjMw5e8



