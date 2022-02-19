import type { NextPage } from "next";
import Head from "next/head";
import { ActivityIndicator } from "react-with-native";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import useStore from "../store";
import { getDefinition, Docs, getDocs } from "../util";
import Endpoint from "../components/Endpoint";

import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Model from "../components/Model";

const hasError = (docs: any) => docs.data?.error;
const Home: NextPage = () => {
  const router = useRouter();
  const { api, search } = router.query;
  const searchString = search
    ? Array.isArray(search)
      ? search.join("/")
      : search
    : "";
  const setSearch = (s: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          api,
          search: s,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const [recentSites, setRecentSites] = useStore("recentSites");
  const apiString = api ? (Array.isArray(api) ? api.join("/") : api) : null;
  const apiUrl = apiString ? decodeURIComponent(apiString) : null;

  const docs = useQuery<
    Docs | { success: false; error: boolean; response: string },
    string
  >(
    ["docs", apiUrl],

    async () => {
      const url = apiUrl && `${apiUrl}/sensible/docs`;

      if (url) {
        return fetch(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            return response;
          })
          .catch((error) => {
            console.warn(error);
            return {
              success: false,
              error: true,
              response: "The API didn't resolve: " + error, //error + error.status +
            };
          });
      } else {
        throw new Error("Couldn't find api string");
      }
    },

    {
      enabled: !!apiUrl,
    }
  );
  const constants = getDocs(docs)?.constants;

  useEffect(() => {
    if (apiUrl && !recentSites.find((x) => x.apiUrl === apiUrl)) {
      setRecentSites(
        recentSites.concat([
          {
            apiUrl,
            appName: constants?.appName,
            domain: constants?.domain,
            email: constants?.email,
          },
        ])
      );
    }
  }, []);

  useEffect(() => {
    if (apiUrl) {
      console.log("REFETCHING");
      docs.refetch();
    }
  }, [apiUrl]);

  const renderModelObject = () => {
    const schema = getDocs(docs)?.schema;

    return (
      schema && (
        <div>
          {Object.keys(schema).map((modelKey) => {
            const definitions = schema[modelKey];
            return (
              <Model
                apiUrl={apiUrl}
                searchString={searchString}
                modelKey={modelKey}
                key={`${modelKey}model`}
                definitions={definitions}
              />
            );
          })}
        </div>
      )
    );
  };

  return (
    <div className="flex flex-col flex-1 items-center">
      <main className="p-4 px-6 lg:px-40 box-border w-full min-h-[90vh]">
        <Header constants={constants} />

        {!!getDocs(docs)?.schema ? (
          <input
            value={searchString}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 border rounded-md p-4 text-xl w-full"
            placeholder="Search endpoints, models &amp; types..."
          />
        ) : null}

        {hasError(docs) ? <p>{docs.data?.response}</p> : null}
        {docs.isLoading ? (
          <div>
            <p>Fetching the newest docs</p>
            <ActivityIndicator className="w-4 h-4" />
          </div>
        ) : null}
        {renderModelObject()}
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
