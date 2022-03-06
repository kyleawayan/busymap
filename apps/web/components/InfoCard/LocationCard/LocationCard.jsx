import React from "react";
import styles from "./LocationCard.module.css";

export default function LocationCard({ roomName, value, desc, lastUpdated }) {
  return (
    <div className={styles.locationCard}>
      <h2>{roomName}</h2>
      <p>{desc}</p>
      <span className={styles.number}>{Math.round(value / 2)}</span>
      <span> people approx.</span>
      <div className={styles.devices}>{value} devices detected</div>
    </div>
  );
}
