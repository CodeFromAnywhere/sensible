import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import useStore from "../store";

const Home: NextPage = () => {
  const router = useRouter();
  const [recentSites, setRecentSites] = useStore("recentSites");

  return (
    <div className="flex flex-col flex-1 max-w-3xl items-center">
      <Head>
        <title>Sensible Docs</title>
        <meta name="description" content="Sensible Docs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <h1 className={"text-5xl"}>Sensible Docs</h1>

        {recentSites.map((site) => {
          <div onClick={() => router.push(`/${decodeURIComponent(site)}`)}>
            {site}
          </div>;
        })}
      </main>
      <footer className={""}>
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
