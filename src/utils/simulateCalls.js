export const simulateCall = (agent, client, setAgents, setClients) => {
  const durationInSeconds = Math.floor(Math.random() * 180) + 1; // Duración entre 1 y 3 minutos
  let elapsedTime = 0;

  // Actualizar estado del agente con la llamada activa
  setAgents((prevAgents) =>
    prevAgents.map((a) =>
      a.id === agent.id
        ? {
            ...a,
            status: "in-call",
            currentClient: client.id,
            callDuration: 0,
            availableTime: 0,
          }
        : a
    )
  );

  // Iniciar contador de llamada
  const interval = setInterval(() => {
    elapsedTime += 1;
    setAgents((prevAgents) =>
      prevAgents.map((a) =>
        a.id === agent.id ? { ...a, callDuration: elapsedTime } : a
      )
    );
  }, 1000);

  // Terminar la llamada después del tiempo definido
  setTimeout(() => {
    clearInterval(interval);

    setAgents((prevAgents) =>
      prevAgents.map((a) =>
        a.id === agent.id
          ? {
              ...a,
              status: "available",
              currentClient: null,
              callDuration: 0,
              availableTime: 0,
            }
          : a
      )
    );

    // Asignar una nueva llamada al agente si hay clientes en espera
    setClients((prevClients) => {
      const updatedClients = prevClients.filter((c) => c.id !== client.id);
      return updatedClients;
    });
  }, durationInSeconds * 1000);
};