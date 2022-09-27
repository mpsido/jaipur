import { backendUrl } from "./constants";

export const restartGame = (ws, gameId) => {
    ws.send(JSON.stringify({ gameId, msgType: "restartGame" }));
};

export const getGame = (ws, gameId, selectedPlayer) => {
    ws.send(JSON.stringify({ gameId, selectedPlayer, msgType: "gameState" }));
};

export const action = (ws, gameId, selectedPlayer, gameAction) => {
    console.log(`Read game state with id ${gameId}`);
    const actionJson = JSON.stringify(gameAction);
    console.log("actionJson", actionJson);
    ws.send(JSON.stringify({ gameId, selectedPlayer, msgType: "gameAction", gameAction }));
};