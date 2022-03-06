import React from "react";

import styles from "./InfoCard.module.css";

export default function InfoCardTextOnly({ title, text }) {
  return (
    <div className={styles.infoCard}>
      <h1 className={styles.container}>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
