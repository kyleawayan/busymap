import React from "react";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";

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
      <p>These stats refresh automatically.</p>
      <div className={styles.locations}>
        {!data && <Skeleton count={5} />}
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
    </div>
  );
}
