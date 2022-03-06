import React from "react";
import styles from "./LocationCard.module.css";

export default function LocationCard({ roomName, number }) {
  return (
    <div className={styles.locationCard}>
      <h2>{roomName}</h2>
      <span className={styles.number}>{Math.round(number / 2)}</span>
      <span> people approx.</span>
      <div className={styles.devices}>{number} devices detected</div>
    </div>
  );
}
