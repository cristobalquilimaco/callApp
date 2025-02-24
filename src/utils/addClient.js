export const addClient = (clients, setClients, clientToAdd) => {
  // Verificar si el cliente ya está en la lista de espera
  const isClientInQueue = clients.some((client) => client.id === clientToAdd.id);

  if (!isClientInQueue) {
    // Agregar el cliente a la lista de espera con un tiempo en espera inicial de 0
    setClients((prevClients) => [
      ...prevClients,
      {
        ...clientToAdd,
        waitTime: 0,
      },
    ]);
  } 
};