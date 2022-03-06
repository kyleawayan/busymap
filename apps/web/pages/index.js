import React from "react";
import Head from "next/head";
import db from "../pages/api/db";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BusyMaps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.tColor}>BusyMaps</h1>
        <p className={styles.description}>
          <h3>Welcome to the new way to find study spaces </h3>
        </p>
        <Link href="/ucmerced">
          <a className={styles.card}>
            <h2>Find a study room &rarr;</h2>
            <p>Quickly find an available study room or lounge!</p>
          </a>
        </Link>
        <p> </p>
        <div className={styles.grid}>
          <div className={styles.firstContainer}>
            <p>
              <h3>How this helps </h3>
              <p>
                BusyMaps is a new way to help make it easy for college students
                to find the perfect spot to study without all the hassle. No
                more walking back and forth across campus carrying all your
                things and without a secure spot to study.
              </p>
            </p>
          </div>
          <div className={styles.container1}>
            <p>
              <h3>Time Efficiency</h3>
              <p>
                BusyMaps saves time for students by reducing their time
                searching for a lounge to a minimum. With just a click of a
                button, availble study spots can easily be found.
              </p>
            </p>
          </div>
          <div className={styles.container2}>
            {/* <div style={{position: "absolute"}}>           
            <Image src="/sun.jpg" 
            width={200}
            height={200}
            priority
            />
            </div> */}
            <h3>Stress relieving</h3>
            <p>
              {" "}
              Students already have alot to worry about, finding a spot to study
              shouldn&apos;t be another on their agenda.{" "}
            </p>
          </div>
          <div className={styles.container1}>
            <h3> More studying</h3>
            <p>
              {" "}
              With less stress and more time available, students can spend more
              time focusing on studying and the important parts of their
              education.{" "}
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Powered by <b>UC Merced Students</b>
          {/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  // TO DO: get DZI image data here too

  const response = await db.query("SELECT * FROM buildings");
  const buildings = response.rows;

  return {
    props: {
      buildings,
    },
  };
}
