"use client";

import { useEffect, useCallback } from "react";
import { useAppContext } from "../../context/AppContext";
import { assignCalls } from "../../utils/assignCalls";
import { addClient } from "../../utils/addClient";
import { AgentList } from "../../components/AgentList";
import { Filters } from "../../components/Filters";
import Link from "next/link";
import styles from "../home.module.css"
import { BtnBack } from "app/components/BtnBack/BtnBack";

export default function AgentsPage() {
  const { agents, setAgents, clients, setClients } = useAppContext();

  // Función para agregar un cliente a la lista de espera
  const handleAddClient = useCallback(() => {
    if (clients.length === 0) return;

    let currentIndex = 0; // Índice del cliente actual

    const addNextClient = () => {
      const nextClient = clients[currentIndex];

      // Verificar si el cliente ya está en la cola de espera o en llamada
      const isClientInQueue = clients.some((client) => client.id === nextClient.id);
      const isClientInCall = agents.some((agent) => agent.currentClient === nextClient.id);

      if (!isClientInQueue && !isClientInCall) {
        // Agregar el cliente a la lista de espera
        addClient(clients, setClients, nextClient);

        // Asignar la llamada inmediatamente si hay agentes disponibles
        assignCalls(agents, clients, setAgents, setClients);
      }

      // Mover al siguiente cliente
      currentIndex = (currentIndex + 1) % clients.length;

      // Programar la próxima llamada después de 3 segundos
      if (currentIndex < clients.length) {
        setTimeout(addNextClient, 3000); // 3 segundos de intervalo
      }
    };

    // Iniciar la primera llamada inmediatamente
    addNextClient();
  }, [agents, clients, setAgents, setClients]);

  // Simular entrada de clientes cada 3 segundos (solo en el cliente)
  useEffect(() => {
    handleAddClient();
  }, [handleAddClient]);

  // Asignar llamadas a agentes disponibles cada segundo (solo en el cliente)
  useEffect(() => {
    const callInterval = setInterval(() => {
      assignCalls(agents, clients, setAgents, setClients);
    }, 1000);

    return () => clearInterval(callInterval);
  }, [agents, clients, setAgents, setClients]);

  // Incrementar el tiempo de espera de los clientes cada segundo (solo en el cliente)
  useEffect(() => {
    const waitTimeInterval = setInterval(() => {
      setClients((prevClients) =>
        prevClients.map((client) => ({
          ...client,
          waitTime: client.waitTime + 1, // Incrementar el tiempo de espera
        }))
      );
    }, 1000);

    return () => clearInterval(waitTimeInterval);
  }, [setClients]);

  // Incrementar el tiempo disponible de los agentes cada segundo (solo en el cliente)
  useEffect(() => {
    const availableTimeInterval = setInterval(() => {
      setAgents((prevAgents) =>
        prevAgents.map((agent) => {
          if (agent.status === "available") {
            return {
              ...agent,
              availableTime: agent.availableTime + 1, // Incrementar como número
            };
          }
          return agent;
        })
      );
    }, 1000);

    return () => clearInterval(availableTimeInterval);
  }, [setAgents]);

  return (
    <div>
      <BtnBack/>
      <AgentList />
    </div>
  );
}