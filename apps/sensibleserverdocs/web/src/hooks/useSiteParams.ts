import { useRouter } from "react-with-native-router";

export const useSiteParams = () => {
  const router = useRouter();
  const { api, search, location } = router.query;
  const searchString = search
    ? Array.isArray(search)
      ? search.join("/")
      : search
    : "";
  const locationString = location
    ? Array.isArray(location)
      ? location.join("/")
      : location
    : "";

  const apiString = api ? (Array.isArray(api) ? api.join("/") : api) : null;
  const apiUrl = apiString ? decodeURIComponent(apiString) : null;

  return {
    location,
    locationString,
    apiUrl,
    apiString,
    searchString,
    api,
    search,
    router,
  };
};
