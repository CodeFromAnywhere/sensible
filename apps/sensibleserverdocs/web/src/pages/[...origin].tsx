import type { NextPage } from "next";
import Head from "next/head";
import { ActivityIndicator, Input } from "react-with-native";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import * as TJS from "typescript-json-schema";
import { useEffect, useState } from "react";
import useStore from "../store";

type PropertiesObject = {
  [key: string]: TJS.DefinitionOrBoolean;
};

const ObjectComponent = ({ properties }: { properties: PropertiesObject }) => {
  const array = Object.keys(properties);
  return (
    <ul className="list-disc list-inside">
      {array.map((key) => {
        const definition = getDefinition(properties[key]);
        return (
          <li key={key} className="text-xs">
            {key}: {definition?.type}
          </li>
        );
      })}
    </ul>
  );
};
const Property = ({
  property,
  propertyName,
}: {
  property: TJS.Definition | null;
  propertyName: string;
}) => {
  const refLink = property?.$ref?.split("/").pop();

  const content = refLink ? (
    <a href={`#${refLink}`}>{refLink}</a>
  ) : property?.type === "string" ? (
    property.enum ? (
      property.enum.join(",")
    ) : (
      property.type
    )
  ) : property?.type === "object" ? (
    <ObjectComponent properties={property.properties!} />
  ) : (
    `Unknown type: ${property?.type}`
  );
  return property ? (
    <div>
      <b>{propertyName}:</b>
      {content}
    </div>
  ) : null;
};

const getDefinition = (
  definitionOrBooleanOrUndefined: TJS.DefinitionOrBoolean | undefined
) => {
  const type = typeof definitionOrBooleanOrUndefined;
  return typeof definitionOrBooleanOrUndefined === "object"
    ? definitionOrBooleanOrUndefined
    : null;
};

type Schema = {
  name: string;
  definition: TJS.DefinitionOrBoolean;
};
type Docs = {
  endpoints?: Schema[];
  models?: Schema[];
  other?: Schema[];
  success: boolean;
  response: string;
};
const Home: NextPage = () => {
  const router = useRouter();
  const { origin } = router.query;
  const originString = origin
    ? Array.isArray(origin)
      ? origin.join("/")
      : origin
    : null;
  const originUrl = originString ? decodeURIComponent(originString) : null;

  const [search, setSearch] = useState("");
  const [recentSites, setRecentSites] = useStore("recentSites");

  useEffect(() => {
    if (originUrl && !recentSites.includes(originUrl)) {
      setRecentSites(recentSites.concat([originUrl]));
    }
  }, []);
  const docs = useQuery<Docs | { success: boolean }>(["docs", origin], () => {
    const url = originString && `${originUrl}/sensible/docs`;

    console.log({ url });
    if (url) {
      return fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    } else {
      return { success: false };
    }
  }); //

  return (
    <div className="flex flex-col flex-1 items-center bg-green-300">
      <Head>
        <title>Sensible Docs</title>
        <meta name="description" content="Sensible Docs" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md p-4 text-xl w-full"
        placeholder="Search endpoints, models &amp; types..."
      />

      <main className="p-4 mx-6 lg:mx-20 bg-blue-50">
        <h1 className={"text-5xl"}>Sensible Docs</h1>

        {docs.isLoading ? (
          <ActivityIndicator />
        ) : (
          (["endpoints", "models", "other"] as const).map((section) => {
            const schemaArray = (docs.data as Docs)?.[section] as Schema[];

            const filteredSchemaArray = schemaArray?.filter((x) =>
              x.name.toLowerCase().includes(search.toLowerCase())
            );

            return (
              <div key={`section_${section}`}>
                <h2 className="text-4xl mt-10">{section}</h2>
                {filteredSchemaArray?.length === 0 ? (
                  <p>No results</p>
                ) : (
                  filteredSchemaArray?.map((schema) => {
                    const name = schema.name;
                    const definition = getDefinition(schema.definition);
                    const properties = definition?.properties
                      ? Object.keys(definition.properties)
                      : [];
                    return (
                      <div id={name} key={`schema${name}`}>
                        <p className="mt-4 text-xl">{name}</p>
                        <p className="text-sm">
                          {properties.map((key) => {
                            const property = getDefinition(
                              definition?.properties?.[key]
                            );
                            return (
                              <Property
                                key={`${name}_${key}`}
                                propertyName={key}
                                property={property}
                              />
                            );
                          })}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            );
          })
        )}
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
