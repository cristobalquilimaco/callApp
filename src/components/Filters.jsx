"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "../components/styles/filters.module.css"

export const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedStatus = searchParams.get("status") || "";

  const handleFilterChange = (filterType, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType); 
    }
    router.push(`?${newParams.toString()}`); 
  };

  return (
    <div className={styles.filterContainer}>
      <p>Filtrar por estado:</p>
      <div className={styles.radioInput}>
      <input
        type="radio"
        id="all"
        name="status"
        value=""
        checked={selectedStatus === ""}
        onChange={(e) => handleFilterChange("status", e.target.value)}
      />
      <label htmlFor="all">Todos</label>

      <input
        type="radio"
        id="available"
        name="status"
        value="available"
        checked={selectedStatus === "available"}
        onChange={(e) => handleFilterChange("status", e.target.value)}
      />
      <label htmlFor="available">Disponible</label>

      <input
        type="radio"
        id="in-call"
        name="status"
        value="in-call"
        checked={selectedStatus === "in-call"}
        onChange={(e) => handleFilterChange("status", e.target.value)}
      />
      <label htmlFor="in-call">En llamada</label>

      <input
        type="radio"
        id="paused"
        name="status"
        value="paused"
        checked={selectedStatus === "paused"}
        onChange={(e) => handleFilterChange("status", e.target.value)}
      />
      <label htmlFor="paused">En pausa</label>
    </div>
    </div>
  );
};
