import { backendUrl } from "./constants";

export const restartGame = (ws, gameId) => {
    ws.send(JSON.stringify({ gameId, msgType: "restartGame" }));
};

export const getGame = (ws, gameId, selectedPlayer) => {
    ws.send(JSON.stringify({ gameId, selectedPlayer, msgType: "gameState" }));
};

export const action = (gameId, player, gameAction) => {
    console.log(`Read game state with id ${gameId}`);
    const actionJson = JSON.stringify(gameAction);
    console.log("actionJson", actionJson);
    return fetch(`${backendUrl}/${gameId}/${player}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: actionJson,
    }).then((actionResult) => {
        console.log("Got Action result", actionResult);
        if (actionResult.status != 200) {
            return actionResult.text().then(errorMsg => {
                throw errorMsg;
            });
        }
        const jsonResponse = actionResult.json();
        console.log("Got Action result (json)", jsonResponse);
        return jsonResponse;
    });
};