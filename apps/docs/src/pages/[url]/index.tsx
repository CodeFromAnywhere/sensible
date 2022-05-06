import type { NextPage } from "next";
import { ActivityIndicator } from "react-with-native";
import { useEffect } from "react";
import useStore from "../store";
import "react-toastify/dist/ReactToastify.css";
import Model from "../components/Model";
import SideBar from "../components/sidebar/SideBar";
import { useSiteParams } from "../hooks/useSiteParams";
import { useScrollTo } from "../hooks/useScrollTo";
import { Layout } from "../components/Layout";
import { useCoreQuery, useOtherQuery } from "../hooks/useQueryHooks";
import { api } from "ui";

const hasError = (docs: any) => docs.data?.error;

const Home: NextPage = () => {
  const { urlUrl, locationString } = useSiteParams();
  const scrollTo = useScrollTo();
  const [recentSites, setRecentSites] = useStore("recentSites");
  const core = useCoreQuery();
  const other = useOtherQuery();
  const constants = other.data?.constants;
  const [showMenuMobile, setShowMenuMobile] = useStore("showMenuMobile");
  useEffect(() => {
    if (core.data?.success && locationString) {
      scrollTo(locationString);
    }
  }, [core.dataUpdatedAt, locationString]);

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
      core.refetch();
    }
  }, [urlUrl]);

  const renderModelObject = () => {
    const models = core.data?.models;

    return (
      models && (
        <div>
          {Object.keys(models).map((modelKey) => {
            const sections = models[modelKey];
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

        {hasError(core) ? <p>{core.data?.response}</p> : null}
        {core.isLoading ? (
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
