export const fetchAgents = async () => {
  const response = await fetch("/data/agents.json");
  if (!response.ok) {
    throw new Error("Error al obtener los agentes");
  }
  return response.json(); // Devuelve un array de agentes
};

export const fetchClients = async () => {
  const response = await fetch("/data/clients.json");
  if (!response.ok) {
    throw new Error("Error al obtener los clientes");
  }
  const data = await response.json();
  return Array.isArray(data) ? data : []; // Asegurar que siempre sea un array
};