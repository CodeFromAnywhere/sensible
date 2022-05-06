import { useRouter } from "next/router";
import { NO_API_SELECTED } from "../../constants";
import useStore from "../../store";
import { getQueryStrings } from "../../util/util";
import Select from "./Select";

const ChooseSite = () => {
  const router = useRouter();
  const { url } = getQueryStrings(router.query);
  const [recentSites, setRecentSites] = useStore("recentSites");

  const siteOptions = recentSites.map((site) => ({
    value: site.apiUrl,
    label: `${site.appName ? `${site.appName} (${site.apiUrl})` : site.apiUrl}`,
  }));

  const defaultWithOptions = [
    { label: "Sensible Docs", value: NO_API_SELECTED.slug },
  ].concat(siteOptions);
  return (
    <Select
      value={url || NO_API_SELECTED.slug}
      onChange={(e) => {
        router.push(`/${encodeURIComponent(e.target.value)}`);
      }}
      options={defaultWithOptions}
    />
  );
};

export default ChooseSite;
