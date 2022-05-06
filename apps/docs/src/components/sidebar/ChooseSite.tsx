import { useRouter } from "next/router";
import { NO_API_SELECTED } from "../../constants";
import useStore from "../../store";
import { getQueryStrings } from "../../util/util";
import Select from "./Select";

const ChooseSite = () => {
  const router = useRouter();
  const { url } = getQueryStrings(router.query);
  const [recentSites, setRecentSites] = useStore("recentSites");

  const options = recentSites.map((site) => ({
    value: site.apiUrl,
    label: `${site.appName ? `${site.appName} (${site.apiUrl})` : site.apiUrl}`,
  }));
  return (
    <Select
      value={url || NO_API_SELECTED.slug}
      onChange={(e) => {
        router.push(`/${encodeURIComponent(e.target.value)}`);
      }}
      options={options}
    />
  );
};

export default ChooseSite;
