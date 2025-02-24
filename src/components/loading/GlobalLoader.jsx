"use client"; // Necesario porque usamos hooks de React (useState y useEffect)

import { useState, useEffect } from "react";

import styles from "../loading/loading.module.css"; // Importa los estilos del loader
import Loader from "./Loader";

export const GlobalLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar el loader

  useEffect(() => {
    // Ocultar el loader después de 4 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 4 segundos

    // Limpiar el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Ocupa toda la altura de la pantalla
          width: "100vw", // Ocupa toda la anchura de la pantalla
          backgroundColor: "#f0f0f0", // Fondo para que se vea bien
          position: "fixed", // Fija el loader en la pantalla
          top: 0,
          left: 0,
          zIndex: 1000, // Asegura que esté por encima de todo
        }}
      >
        <div className={styles.loader}>
          <Loader />
        </div>
      </div>
    );
  }

  return children; // Mostrar el contenido de la aplicación después de 4 segundos
};