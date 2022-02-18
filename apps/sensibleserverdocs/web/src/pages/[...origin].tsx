import type { NextPage } from "next";
import Head from "next/head";
import { ActivityIndicator, Input } from "react-with-native";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import * as TJS from "typescript-json-schema";
import { useEffect, useState } from "react";
import useStore from "../store";
import AiOutlineCopyIcon from "../../public/AiOutlineCopy.svg";
import { Svg } from "react-with-native";
import { toast } from "react-with-native-notification";
import "react-toastify/dist/ReactToastify.css";
import BsCodeIcon from "../../public/BsCode.svg";
import VscTerminalCmdIcon from "../../public/VscTerminalCmd.svg";
import { toQueryString } from "sensible-ui";
import { objectMap } from "sensible-core";
type PropertiesObject = {
  [key: string]: TJS.DefinitionOrBoolean;
};

const getTypeInterfaceString = ({
  name,
  definition,
  properties,
}: {
  name: string;
  definition: any;
  properties: string[];
}) => {
  return `interface ${name} {\n\t${properties
    .map(
      (key) => `${key}: ${getDefinition(definition?.properties?.[key])?.type}`
    )
    .join(`\n\t`)}\n}`;
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

const isDocs = (docs: Docs | null): docs is Docs => {
  return (
    !!docs?.endpoints &&
    !!docs?.models &&
    !!docs?.other &&
    !!docs?.response &&
    docs?.success
  );
};
const getDocs = (docsQuery: any): Docs | null => {
  return isDocs(docsQuery.data) ? docsQuery.data : null;
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
  });

  const [bodyInput, setBodyInput] = useState<object | null>(null);

  const [search, setSearch] = useState("");
  const [recentSites, setRecentSites] = useStore("recentSites");

  useEffect(() => {
    const bodyInputs = getDocs(docs)?.endpoints?.map((endpoint) => {
      //do stuff here with the endpoint, convert to use body example per parameter from schema
    });
  }, [docs]);
  useEffect(() => {
    if (originUrl && !recentSites.includes(originUrl)) {
      setRecentSites(recentSites.concat([originUrl]));
    }
  }, []);

  const sectionName = {
    endpoints: "endpoint",
    models: "model",
    other: "type",
  };
  return (
    <div className="flex flex-col flex-1 items-center">
      <Head>
        <title>Sensible Docs</title>
        <meta name="description" content="Sensible Docs" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>

      <main className="p-4 px-6 lg:px-40 box-border w-full">
        <h1 className={"text-5xl"}>Sensible Docs</h1>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-4 text-xl w-full"
          placeholder="Search endpoints, models &amp; types..."
        />
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

                    const getMainMethod = getDefinition(
                      definition?.properties?.method
                    )?.enum?.[0];
                    const isPost = getMainMethod === "POST";
                    const isGet = getMainMethod === "GET";
                    const methodOptions = isPost ? " -X POST" : "";

                    const getBody = definition?.properties; //&&
                    // objectMap(definition?.properties, (value, key) => {
                    //   return bodyInput[name][key];
                    // });

                    const bodyOptions = ""; // isPost ? getBody : "";

                    const query = ""; //isGet ? toQueryString(getBody) : "";

                    return (
                      <div id={name} key={`schema${name}`}>
                        <div className="flex items-center mt-4">
                          <p className="text-xl">{name}</p>
                          <div
                            className="cursor-pointer ml-3"
                            onClick={() => {
                              const strippedHashtag =
                                window.location.href.split("#")[0];
                              navigator.clipboard.writeText(
                                strippedHashtag + "#" + name
                              );
                              toast({
                                title: "Copied",
                                body: `You've copied the link to this ${sectionName[section]}`,
                              });
                            }}
                          >
                            <Svg src={AiOutlineCopyIcon} className="w-4 h-4" />
                          </div>

                          <div
                            className="cursor-pointer ml-3"
                            onClick={() => {
                              const code =
                                section === "endpoints"
                                  ? `api()`
                                  : section === "models"
                                  ? getTypeInterfaceString({
                                      name,
                                      definition,
                                      properties,
                                    })
                                  : section === "other"
                                  ? getTypeInterfaceString({
                                      name,
                                      definition,
                                      properties,
                                    })
                                  : "Invalid section";
                              navigator.clipboard.writeText(code);
                              toast({
                                title: "Copied",
                                body: `You've copied the code for this ${sectionName[section]}`,
                              });
                            }}
                          >
                            <Svg src={BsCodeIcon} className="w-4 h-4" />
                          </div>

                          {section === "endpoints" ? (
                            <div
                              className="cursor-pointer ml-3"
                              onClick={() => {
                                const fullPath = originUrl + "/" + name + query;
                                const command = `curl${methodOptions}${bodyOptions} '${fullPath}'`;
                                navigator.clipboard.writeText(command);
                                toast({
                                  title: "Copied",
                                  body: `You've copied the curl command for this ${sectionName[section]}`,
                                });
                              }}
                            >
                              <Svg
                                src={VscTerminalCmdIcon}
                                className="w-4 h-4"
                              />
                            </div>
                          ) : null}
                        </div>
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
