export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};


// Esta funcion nos permitira convertir el tiempo de espera de los clientes y el tiempo en llamada y disponible de los agentes en formato  MM:SS