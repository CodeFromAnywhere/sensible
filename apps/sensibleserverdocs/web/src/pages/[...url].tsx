import type { NextPage } from "next";
import { ActivityIndicator } from "react-with-native";
import { useEffect } from "react";
import useStore from "../store";
import { getDocs, isDocs } from "../util";
import "react-toastify/dist/ReactToastify.css";
import Model from "../components/Model";
import SideBar from "../components/sidebar/SideBar";
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
  const [showMenuMobile, setShowMenuMobile] = useStore("showMenuMobile");
  useEffect(() => {
    const dataIsDocs = isDocs(docs.data);
    if (dataIsDocs && locationString) {
      scrollTo(locationString);
    }
  }, [docs.dataUpdatedAt, locationString]);

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
            const sections = schema[modelKey];
            return (
              <Model
                modelKey={modelKey}
                key={`${modelKey}model`}
                sections={sections}
              />
            );
          })}
        </div>
      )
    );
  };

  return (
    <Layout>
      <div
        className={`lg:w-80 lg:block w-full overflow-y-scroll ${
          showMenuMobile ? "block" : "hidden"
        }`}
      >
        <SideBar />
      </div>

      <div
        className={`flex-1 w-full overflow-y-scroll px-8 ${
          showMenuMobile ? "hidden" : "block"
        } lg:block`}
      >
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
