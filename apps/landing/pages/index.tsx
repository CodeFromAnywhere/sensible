import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sensible - The Full Stack Typescript Framework</title>
        <meta
          name="description"
          content="Sensible - The Full Stack Typescript Framework"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The <b>Typescript</b> Framework For <b>Effective</b> Teams
        </h1>

        <p className={styles.description}>
          We're not going to explain Sensible, we're still too busy developing
          it. Join us, and make a PR!
        </p>

        <div className={styles.grid}>
          <a
            href="https://github.com/Code-From-Anywhere/sensible"
            className={styles.card}
          >
            <h2>GitHub &rarr;</h2>
            <p>Find Documentation, guides, and the code here...</p>
          </a>

          <a
            href="https://github.com/Code-From-Anywhere/sensible/tree/main/docs/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>
              Discover other projects using Sensible and see what it looks like.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://codefromanywhere.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Code From Anywhere
        </a>
      </footer>
    </div>
  );
};

export default Home;
