import type { NextPage } from "next";
import Head from "next/head";
import { ActivityIndicator } from "react-with-native";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import useStore from "../store";
import { getDefinition, DefinitionObject, Docs, getDocs } from "../util";
import Endpoint from "../components/Endpoint";

import "react-toastify/dist/ReactToastify.css";

const Home: NextPage = () => {
  const router = useRouter();
  const { api } = router.query;
  const apiString = api ? (Array.isArray(api) ? api.join("/") : api) : null;

  const apiUrl = apiString ? decodeURIComponent(apiString) : null;

  const docs = useQuery<Docs | { success: false }>(["docs", apiUrl], () => {
    const url = apiString && `${apiUrl}/sensible/docs`;

    if (url) {
      return fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    } else {
      const success: false = false;
      return { success };
    }
  });

  const [search, setSearch] = useState("");
  const [recentSites, setRecentSites] = useStore("recentSites");

  useEffect(() => {
    if (apiUrl && !recentSites.includes(apiUrl)) {
      setRecentSites(recentSites.concat([apiUrl]));
    }
  }, []);

  const renderModelObject = () => {
    const schema = getDocs(docs)?.schema;

    return (
      schema && (
        <div>
          {Object.keys(schema).map((modelKey) => {
            const definitions = schema[modelKey];

            return (
              <div key={`${modelKey}model`}>
                <h2 className="text-3xl">{modelKey}</h2>

                {definitions.endpoints &&
                  Object.keys(definitions.endpoints).map((endpointKey) => {
                    const definition = getDefinition(
                      definitions.endpoints?.[endpointKey]
                    );
                    return definition && apiUrl ? (
                      <Endpoint
                        apiUrl={apiUrl}
                        search={search}
                        key={`${modelKey}model_${endpointKey}endpoint`}
                        id={endpointKey}
                        definition={definition}
                      />
                    ) : null;
                  })}
              </div>
            );
          })}
        </div>
      )
    );
  };

  const constants = getDocs(docs)?.constants;
  const title = `${
    constants?.appName ? `${constants.appName} - ` : ""
  }Sensible Docs`;

  return (
    <div className="flex flex-col flex-1 items-center">
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>

      <main className="p-4 px-6 lg:px-40 box-border w-full">
        <h1 className={"text-5xl mb-4"}>{title}</h1>
        <div className="flex flex-row">
          {constants?.domain ? (
            <a
              className="bg-gray-300 rounded-full p-2 mr-4"
              href={constants.domain}
              rel="noreferrer"
              target="_blank"
            >
              visit website
            </a>
          ) : null}

          {constants?.email ? (
            <a
              className="bg-gray-300 rounded-full p-2 mr-4"
              href={`mailto:${constants.email}`}
              rel="noreferrer"
              target="_blank"
            >
              email
            </a>
          ) : null}
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 border rounded-md p-4 text-xl w-full"
          placeholder="Search endpoints, models &amp; types..."
        />
        {docs.isLoading ? <ActivityIndicator /> : renderModelObject()}
      </main>
      <footer className={"flex flex-1"}>
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
