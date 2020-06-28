import * as WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8080 });

const broadcast = (wss, ws, message) => {
  wss.clients.forEach((client) => {
    if (client === ws || client.readyState !== WebSocket.OPEN) {
      return;
    }
    client.send(message);
  });
};

wss.on("connection", (ws, req) => {
  const id = req.headers["sec-websocket-key"];
  ws.on("message", (message) => {
    console.log(`${id}: ${message}`);
    broadcast(wss, ws, message);
  });
});
