"use client";

import styles from "../loading/loading.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}