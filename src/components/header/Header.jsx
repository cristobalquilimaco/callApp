"use client";
import Link from "next/link";
import styles from "./header.module.css";
import { useAppContext } from "../../context/AppContext"; 


export const Header = () => {
  const { setSearchTerm } = useAppContext(); 

  const normalizeText = (text) => 
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  

  return (
    <header className={styles.headerContainer}>
      <div className={styles.titleApp}>
        <h1>Gestion De Llamadas</h1>
        <p className={styles.description}>
          Gestiona agentes y clientes en tiempo real.
        </p>
      </div>
      <div className={styles.btnsHeader}>
        <Link href="/agents">
          <button className={styles.bookmarkBtn}>
            <span className={styles.IconContainer}>
              <i className='bx bx-headphone'></i>
            </span>
            <p className={styles.titleBtn}>Ver Agentes</p>
          </button>
        </Link>
        <Link href="/clients">
          <button className={styles.bookmarkBtn}>
            <span className={styles.IconContainer}>
              <i className='bx bx-user-circle'></i>
            </span>
            <p className={styles.titleBtn}>Ver clientes</p>
          </button>
        </Link>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          name="text"
          type="text"
          placeholder="Buscar Agentes..."
          onChange={(e) => setSearchTerm(e.target.value.trim().toLowerCase())}
        />
      </div>
    </header>
  );
};