import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hello World Page</title>
        <meta name="description" content="A simple Hello World Next.js page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello World!</h1>
        <p className={styles.description}>
          This is a simple Next.js page saying Hello World.
        </p>
      </main>

      <footer className={styles.footer}>
        Powered by <a href="https://nextjs.org">Next.js</a>
      </footer>
    </div>
  );
}
