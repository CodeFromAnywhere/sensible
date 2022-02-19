import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import useStore from "../store";
import BiWorldIcon from "../../public/BiWorld.svg";
import { Svg } from "react-with-native";
const Home: NextPage = () => {
  const router = useRouter();
  const [recentSites, setRecentSites] = useStore("recentSites");

  const sites = recentSites.find((x) => x.apiUrl === "http://localhost:4000")
    ? recentSites
    : recentSites.concat([
        {
          apiUrl: "http://localhost:4000",
          appName: "Localhost 4000",
          domain: "http://localhost:3000",
        },
      ]);
  return (
    <div className="flex flex-col flex-1 items-center">
      <Head>
        <title>Sensible Docs</title>
        <meta name="description" content="Sensible Docs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1
        className={
          "text-5xl mb-10 w-full flex items-center bg-gray-200 px-6 lg:px-40 h-[16vh]"
        }
      >
        Sensible Docs
      </h1>
      <main className="p-4 min-h-[64vh] px-6 lg:px-40 w-full">
        {sites.map((site, index) => {
          return (
            <div
              key={`site${index}`}
              className="flex flex-row border hover:bg-gray-200 justify-between rounded-sm items-center p-4 w-full"
            >
              <p
                onClick={() =>
                  router.push(`/${encodeURIComponent(site.apiUrl)}`)
                }
              >
                {site.appName
                  ? `${site.appName} (${site.apiUrl})`
                  : site.apiUrl}
              </p>

              {site.domain ? (
                <a href={site.domain} target="_blank" rel="noreferrer">
                  <Svg src={BiWorldIcon} className="w-8 h-8" />
                </a>
              ) : null}
            </div>
          );
        })}
      </main>

      <footer
        className={
          "bg-gray-200 h-[16vh] items-center flex px-6 lg:px-40 w-full"
        }
      >
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
