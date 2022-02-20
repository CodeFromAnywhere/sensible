import type { NextPage } from "next";
import { ActivityIndicator } from "react-with-native";
import { useQuery } from "react-query";
import { useEffect } from "react";
import useStore from "../store";
import {
  getDefinition,
  getDocs,
  isDocs,
  DocsResult,
  getFirstEnum,
  isEndpoint,
  notEmpty,
} from "../util";
import "react-toastify/dist/ReactToastify.css";
import Model from "../components/Model";
import SideBar from "../components/sidebar/SideBar";
import { Section } from "../components/sidebar/Menu";
import { useSiteParams } from "../hooks/useSiteParams";
import { useScrollTo } from "../hooks/useScrollTo";
import { Layout } from "../components/Layout";
import { useDocsQuery } from "../hooks/useDocsQuery";

const hasError = (docs: any) => docs.data?.error;
const Home: NextPage = () => {
  const { urlUrl, locationString } = useSiteParams();
  const scrollTo = useScrollTo();
  const [recentSites, setRecentSites] = useStore("recentSites");
  const docs = useDocsQuery();
  const constants = getDocs(docs)?.constants;

  useEffect(() => {
    const dataIsDocs = isDocs(docs.data);
    console.log({ locationString, dataChanged: true, dataIsDocs });
    if (dataIsDocs && locationString) {
      scrollTo(locationString);
    }
  }, [docs.data, locationString]);

  useEffect(() => {
    if (urlUrl && !recentSites.find((x) => x.apiUrl === urlUrl)) {
      setRecentSites(
        recentSites.concat([
          {
            apiUrl: urlUrl,
            appName: constants?.appName,
            domain: constants?.domain,
            email: constants?.email,
          },
        ])
      );
    }
  }, []);

  useEffect(() => {
    if (urlUrl) {
      docs.refetch();
    }
  }, [urlUrl]);

  const renderModelObject = () => {
    const schema = getDocs(docs)?.schema;

    return (
      schema && (
        <div>
          {Object.keys(schema).map((modelKey) => {
            const definitions = schema[modelKey];
            return (
              <Model
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

  const schema = getDocs(docs)?.schema;

  const modelKeys = schema ? Object.keys(schema) : [];

  const sections = modelKeys.map((modelKey) => {
    const model = schema?.[modelKey];

    const endpointSections = model?.endpoints
      ? Object.keys(model.endpoints)
          .map((endpointKey) => {
            const definition = getDefinition(model?.endpoints?.[endpointKey]);

            const path = getFirstEnum(definition, "path");
            const method = getFirstEnum(definition, "method");

            return isEndpoint(definition)
              ? {
                  title: endpointKey,
                  key: `${modelKey}.${endpointKey}`,
                  href: `${method}:${path}`,
                }
              : null;
          })
          .filter(notEmpty)
      : [];

    const typeSections = model?.types
      ? Object.keys(model.types).map((typeKey) => {
          return {
            title: typeKey,
            key: `${modelKey}.${typeKey}`,
            href: typeKey,
          };
        })
      : [];

    const modelSections: Section = {
      key: modelKey,
      title: modelKey,
      sections: [
        {
          title: "Endpoints",
          sections: endpointSections,
          key: `${modelKey}.Endpoints`,
        },
        {
          title: "Types",
          sections: typeSections,
          key: `${modelKey}.Types`,
        },
      ],
    };
    return modelSections;
  });
  return (
    <Layout constants={constants}>
      <div className="overflow-y-scroll">
        <SideBar sections={sections} />
      </div>

      <div className="flex-1 w-full overflow-y-scroll px-8">
        {/* {!!getDocs(docs)?.schema ? <Search /> : null} */}

        {hasError(docs) ? <p>{docs.data?.response}</p> : null}
        {docs.isLoading ? (
          <div>
            <p>Fetching the newest docs</p>
            <ActivityIndicator className="w-4 h-4" />
          </div>
        ) : null}
        {renderModelObject()}
      </div>
    </Layout>
  );
};

export default Home;
