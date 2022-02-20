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

  const setSearch = (s: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          url,
          location,
          search: s,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return {
    location,
    locationString,
    url,
    urlString,
    urlUrl,
    searchString,
    search,
    router,
    setSearch,
  };
};
