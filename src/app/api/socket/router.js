import { WebSocketServer } from "ws";

let wss;

export function GET(req) {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on("connection", (ws) => {
      console.log("Cliente conectado");

      ws.on("message", (message) => {
        console.log("Mensaje recibido:", message.toString());
        ws.send("Mensaje recibido por el servidor WebSocket");
      });

      ws.on("close", () => {
        console.log("Cliente desconectado");
      });
    });
  }

  return new Response("WebSocket server running", { status: 200 });
}
