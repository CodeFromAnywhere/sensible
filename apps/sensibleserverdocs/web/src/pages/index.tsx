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
    <div className="flex flex-col items-center flex-1">
      <Head>
        <title>Sensible Docs</title>
        <meta name="description" content="Sensible Docs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1
        className={
          "text-5xl mb-10 w-full flex items-center bg-grayish px-6 lg:px-40 h-[16vh]"
        }
      >
        Sensible Docs
      </h1>
      <main className="p-4 min-h-[64vh] px-6 lg:px-40 w-full">
        {sites.map((site, index) => {
          return (
            <div
              onClick={() => router.push(`/${encodeURIComponent(site.apiUrl)}`)}
              key={`site${index}`}
              className="flex flex-row items-center justify-between w-full p-4 border rounded-sm hover:bg-grayish"
            >
              <p>
                {site.appName
                  ? `${site.appName} (${site.apiUrl})`
                  : site.apiUrl}
              </p>

              {site.domain || true ? (
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(site.domain, "_blank")?.focus();
                  }}
                  className="hover:bg-blueish rounded-full p-2"
                >
                  <Svg src={BiWorldIcon} className="w-8 h-8" />
                </p>
              ) : null}
            </div>
          );
        })}
      </main>

      <footer
        className={"bg-grayish h-[16vh] items-center flex px-6 lg:px-40 w-full"}
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
