import { useEffect } from "react";
import { fetchClients } from "../utils/api";
import { useAppContext } from "../context/AppContext";

export const useClients = () => {
  const { clients, setClients } = useAppContext();

  useEffect(() => {
    const getClients = async () => {
      try {
        const data = await fetchClients();
        setClients(
          data.map((client) => ({
            ...client,
            waitTime: 0, // Tiempo de espera inicial
          }))
        );
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    getClients();
  }, [setClients]);

  return { clients, setClients };
};