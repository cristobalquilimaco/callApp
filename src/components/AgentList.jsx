"use client";

import { useSearchParams } from "next/navigation";
import styles from "../components/styles/agentList.module.css";
import { useAppContext } from "../context/AppContext";
import { formatTime } from "app/utils/formatTime";
import { Filters } from "./Filters";

export const AgentList = () => {
  const { agents, searchTerm } = useAppContext();
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status");

  const filteredAgents = agents.filter((agent) => {
    const matchesStatus = statusFilter ? agent.status === statusFilter : true;
    const matchesSearchTerm = searchTerm
      ? `${agent.name} ${agent.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesStatus && matchesSearchTerm;
  });

  return (
    <div className={styles.agentContainer}>
      <h2>Agentes</h2>
      <Filters/>
      <ul className={styles.listAgent}>
        {filteredAgents.map((agent) => (
          <li key={agent.id} className={styles.listAgentId}>
            <i className="bx bx-headphone"></i>
            {agent.name} {agent.lastName} -{" "}
            {agent.status === "in-call"
              ? `En llamada (${formatTime(agent.callDuration)})`
              : agent.status === "paused"
              ? "En pausa"
              : `Disponible (${formatTime(agent.availableTime || "0:00")})`}
          </li>
        ))}
      </ul>
    </div>
  );
};