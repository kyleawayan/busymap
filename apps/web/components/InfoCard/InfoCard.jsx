import React from "react";

import styles from "./InfoCard.module.css";
import LocationCard from "./LocationCard/LocationCard";

export default function InfoCard({ building }) {
  console.log(building);
  return (
    <div className={styles.infoCard}>
      <h1 className={styles.container}>{building?.name}</h1>
      <LocationCard roomName={"271 Lounge"} number={31} />
      <LocationCard roomName={"271 Lounge"} number={0} />
    </div>
  );
}
