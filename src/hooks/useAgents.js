import { useEffect } from "react";
import { fetchAgents } from "../utils/api";
import { useAppContext } from "../context/AppContext";

export const useAgents = () => {
  const { agents, setAgents } = useAppContext();

  useEffect(() => {
    const getAgents = async () => {
      try {
        const data = await fetchAgents();
        setAgents(
          data.map((agent) => ({
            ...agent,
            status: "available", // Estado inicial
            callDuration: 0, // Duración de la llamada en segundos
            availableTime: 0, // Tiempo disponible en segundos
            currentClient: null, // Cliente actual asignado
          }))
        );
      } catch (error) {
        console.error("Error al obtener los agentes:", error);
      }
    };

    getAgents();
  }, [setAgents]);

  return agents;
};