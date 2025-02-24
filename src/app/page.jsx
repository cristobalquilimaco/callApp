"use client"

import styles from "../app/home.module.css"
import { Header } from "app/components/header/Header";
import { useAppContext } from "../context/AppContext";
import { ClientList } from "app/components/ClientList";
import { AgentList } from "app/components/AgentList";


export default function Home() {
const {clients } = useAppContext()

  return (
<div className={styles.page}>
  <Header/>
  <main className={styles.main}>
  <section className={styles.containerAgentsHome}>
      <AgentList/>
    </section>
    <div className={styles.principalStats}>
    <div className={styles.stats}>
      <div className={styles.stat}>
      <i className='bx bx-headphone' ></i>
        <h2>Agentes Activos</h2>
        <p>15</p>
      </div>
      <div className={styles.stat}>
        <i className={'bx bx-phone-call'} ></i>
          <h2>En Espera</h2>
        <p>{clients.length}</p>
      </div>
      </div>
      <ClientList/>
    </div>
  </main>
  <footer className={styles.footer}>
    <p>
      © {new Date().getFullYear()} Contact Center. Todos los derechos reservados.
    </p>
    <p>
      Cristobal Quilimaco
    </p>
    <p>
      Git Hub
    </p>
  </footer>
</div>
  );
}