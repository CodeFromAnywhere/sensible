import { useRouter } from "react-with-native-router";

export const useSiteParams = () => {
  const router = useRouter();
  const { url, search, location } = router.query;
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

  const urlString = url ? (Array.isArray(url) ? url.join("/") : url) : null;
  const urlUrl = urlString ? decodeURIComponent(urlString) : null;

  return {
    location,
    locationString,
    url,
    urlString,
    urlUrl,
    searchString,
    search,
    router,
  };
};
