const backendUrl = "http://localhost:3000"


export const startGame = (gameId) => {
    console.log(`Starting game with id ${gameId}`);
    return fetch(`${backendUrl}/start/${gameId}`).then((gameState) => {
        const jsonResponse = gameState.json();
        console.log("Got Game state", jsonResponse);
        return jsonResponse;
    }).catch(console.error);
};

export const getGame = (gameId) => {
    console.log(`Read game state with id ${gameId}`);
    return fetch(`${backendUrl}/${gameId}`).then((gameState) => {
        const jsonResponse = gameState.json();
        console.log("Got Game state", jsonResponse);
        return jsonResponse;
    }).catch(console.error);
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