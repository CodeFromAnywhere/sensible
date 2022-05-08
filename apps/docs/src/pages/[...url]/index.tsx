import type { NextPage } from "next";
import { ActivityIndicator } from "react-with-native";
import { useEffect } from "react";
import useStore from "../../store";
import "react-toastify/dist/ReactToastify.css";
import Model from "../../components/Model";
import { useCoreQuery, useOtherQuery } from "../../util/useQueryHooks";
import { useRouter } from "react-with-native-router";
import { getQueryStrings } from "../../util/util";
import { NO_API_SELECTED } from "../../constants";

const hasError = (docs: any) => docs.data?.error;

const Home: NextPage = () => {
  const router = useRouter();
  const { url, location } = getQueryStrings(router.query);
  // const scrollTo = useScrollTo();
  const [recentSites, setRecentSites] = useStore("recentSites");
  const core = useCoreQuery();
  const other = useOtherQuery();
  const constants = other.data?.constants;
  // this results in unwanted scrollling
  // useEffect(() => {
  //   if (core.data?.success && location) {
  //     scrollTo(location);
  //   }
  // }, [core.dataUpdatedAt, location]);

  // adding the site from your link to the recent sites, if not already there
  useEffect(() => {
    if (
      url &&
      !recentSites.find((x) => x.apiUrl === url) &&
      url !== NO_API_SELECTED.slug
    ) {
      setRecentSites(
        recentSites.concat([
          {
            apiUrl: url,
            appName: constants?.appName,
            domain: constants?.domain,
            email: constants?.email,
          },
        ])
      );
    }
  }, []);

  useEffect(() => {
    if (url) {
      core.refetch();
    }
  }, [url]);

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
    <div>
      {hasError(core) ? <p>{core.data?.response}</p> : null}
      {core.isLoading ? (
        <div>
          <p>Fetching the newest docs</p>
          <ActivityIndicator className="w-4 h-4" />
        </div>
      ) : null}
      {renderModelObject()}
    </div>
  );
};

export default Home;
