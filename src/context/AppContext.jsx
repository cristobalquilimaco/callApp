"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { setupWebSocket } from "../utils/websocket";
import { fetchAgents, fetchClients } from "../utils/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [agents, setAgents] = useState([]); // Inicializar como array vacío
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [socket, setSocket] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Verificar si estamos en el cliente (Next.js)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cargar datos iniciales (agentes y clientes)
  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      try {
        const agentsData = await fetchAgents();
        const clientsData = await fetchClients();

        // Inicializar agentes como disponibles
        setAgents(
          agentsData.map((agent) => ({
            ...agent,
            status: "available", // Todos los agentes están disponibles al inicio
            callDuration: 0, // Número, no cadena de texto
            availableTime: 0, // Número, no cadena de texto
            currentClient: null, // Sin cliente asignado
          }))
        );

        setClients(clientsData); // Inicializar con los clientes del JSON
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, [isClient]);

  // Configurar WebSocket para actualizaciones en tiempo real
  useEffect(() => {
    if (!isClient) return;

    console.log("Attempting to connect to WebSocket...");

    const ws = setupWebSocket("ws://localhost:3000/api/socket", (data) => {
      console.log("📩 WebSocket message received:", data);

      if (data.type === "agents") {
        setAgents(data.payload);
      } else if (data.type === "clients") {
        setClients(data.payload);
      }
    });

    setSocket(ws);

    return () => {
      console.log("🔌 Closing WebSocket...");
      ws.close();
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <AppContext.Provider
      value={{ agents, setAgents, clients, setClients, searchTerm, setSearchTerm, socket }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
