//web_app.ts

//Initiate WebSocket connection

export function connect(url, gameId, onMessage) {
    let ws = new WebSocket(url); 
    ws.onopen = (event) => {
        console.log("connected");
        ws.send(JSON.stringify({ gameId }));
    };
    ws.onmessage = onMessage;
    ws.onerror = onError;
    ws.onclose = onClose;

    return ws;
}

function onError(event) {
    console.log(JSON.stringify(event.data));
}

function onClose(event) {
    console.log(JSON.stringify(event.data));
}