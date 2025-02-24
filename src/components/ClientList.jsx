"use client";

import { useState, useEffect } from "react";
import { useClients } from "../hooks/useClients";
import { useAppContext } from "../context/AppContext";
import { assignCalls } from "../utils/assignCalls";
import { addClient } from "../utils/addClient";
import styles from "../components/styles/clientList.module.css";
import { formatTime } from "app/utils/formatTime";
import btnStyles from "../components/header/header.module.css";

export const ClientList = () => {
  const { clients, setClients } = useClients();
  const { agents, setAgents } = useAppContext();
  const [filter, setFilter] = useState("asc");
  const [showAllClients, setShowAllClients] = useState(false); // En este estado se controla si se muestran todos los clientes

  // Aqui se incrementa el tiempo en espera de los cleintes
  useEffect(() => {
    const interval = setInterval(() => {
      setClients((prevClients) =>
        prevClients.map((client) => ({
          ...client,
          waitTime: (client.waitTime || 0) + 1,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [setClients]);

  // Simulamos llamadas cada 3 segundos
  useEffect(() => {
    if (clients.length === 0) return;

    let currentIndex = 0;

    const addNextClient = () => {
      const nextClient = clients[currentIndex];

      // Verificar si el cliente ya esta en la cola de espera o en llamada
      const isClientInQueue = clients.some((client) => client.id === nextClient.id && client.waitTime > 0);
      const isClientInCall = agents.some((agent) => agent.currentClient === nextClient.id);

      if (!isClientInQueue && !isClientInCall) {
        // Agregar el cliente a la cola de espera
        addClient(clients, setClients, nextClient);
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
  }, [clients, agents]);

  // Asignar llamadas a los agentes disponibles
  useEffect(() => {
    const assignCallInterval = setInterval(() => {
      assignCalls(agents, clients, setAgents, setClients);
    }, 1); // Verificar cada segundo

    return () => clearInterval(assignCallInterval);
  }, [agents, clients, setAgents, setClients]);

  const sortClients = (clients, filter) => {
    return [...clients].sort((a, b) => {
      const timeA = a.waitTime || 0;
      const timeB = b.waitTime || 0;
      return filter === "asc" ? timeA - timeB : timeB - timeA;
    });
  };

  const sortedClients = sortClients(clients, filter);
  const displayedClients = showAllClients ? sortedClients : sortedClients.slice(0, 10); // Muestra solo los primeros 10 clientes en espera

  return (
    <div className={styles.agentContainer}>
      <h1 className={styles.callTitle}>Llamadas entrantes</h1>
      <div className={styles.filterControls}>
        <label htmlFor="filter">Ordenar por tiempo en espera: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
      </div>
      {clients.length === 0 ? (
        <p className={styles.noCallsMessage}>No hay llamadas en espera</p>
      ) : (
        <>
          <ul className={styles.listAgent}>
            {displayedClients.map((client) => (
              <li key={client.id} className={styles.listAgentId}>
                <i className="bx bx-user-circle"></i>
                {client.name} {client.lastname} - {formatTime(client.waitTime)} en espera
              </li>
            ))}
          </ul>
          {clients.length > 10 && !showAllClients && ( // Mostrar el botón solo si hay más de 10 clientes y no se están mostrando todos
            <div className={styles.seeMoreContainer}>
              <button
                className={btnStyles.bookmarkBtn}
                onClick={() => setShowAllClients(true)} // Mostrar todos los clientes al hacer clic
              >
                <span className={btnStyles.IconContainer}>
                  <i className="bx bx-user-circle"></i>
                </span>
                <p className={btnStyles.titleBtn}>Ver más</p>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};