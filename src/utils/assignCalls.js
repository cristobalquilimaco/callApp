import { simulateCall } from "./simulateCalls";

export const assignCalls = (agents, clients, setAgents, setClients) => {
  const availableAgents = agents.filter((agent) => agent.status === "available");
  const waitingClients = clients.filter((client) => client.waitTime > 0 && !client.onCall);

  if (availableAgents.length > 0 && waitingClients.length > 0) {
    const clientsToAssign = waitingClients.slice(0, availableAgents.length);

    clientsToAssign.forEach((client, index) => {
      const agent = availableAgents[index];
      simulateCall(agent, client, setAgents, setClients);
    });

    // Eliminar los clientes asignados de la lista de espera
    setClients((prevClients) =>
      prevClients.filter((client) => !clientsToAssign.includes(client))
    );
  }
};