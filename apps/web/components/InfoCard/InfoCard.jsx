import React from "react";
import useSWR from "swr";

import styles from "./InfoCard.module.css";
import LocationCard from "./LocationCard/LocationCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function InfoCard({ building }) {
  const { data, error } = useSWR(
    `/api/getLocationsAndData?building=${building.id}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  return (
    <div className={styles.infoCard}>
      <h1 className={styles.container}>{building?.name}</h1>
      {data &&
        data.locations.map((location) => (
          <LocationCard
            roomName={location.roomName}
            key={location.id}
            value={location.value}
            desc={location.desc}
          />
        ))}
    </div>
  );
}
