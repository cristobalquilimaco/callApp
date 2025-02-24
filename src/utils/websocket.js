export const setupWebSocket = (url, onMessage) => {
  try {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("✅ WebSocket conectado a", url);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 WebSocket mensaje recibido:", data);
        onMessage(data);
      } catch (error) {
        console.error("❌ Error al parsear mensaje WebSocket:", error, "Datos:", event.data);
      }
    };

    socket.onerror = (error) => {
      console.error("🚨 Error WebSocket:", error.message || error);
    };

    socket.onclose = (event) => {
      console.warn("⚠️ WebSocket cerrado. Motivo:", event.reason || "Desconocido");
    };

    return socket;
  } catch (error) {
    console.error("🔥 Error al crear WebSocket:", error);
    return null;
  }
};
