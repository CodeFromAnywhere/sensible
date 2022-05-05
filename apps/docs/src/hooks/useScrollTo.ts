import { useRouter } from "react-with-native-router";
import useStore from "../store";
import { useSiteParams } from "./useSiteParams";

export const useScrollTo = () => {
  const router = useRouter();
  const { url, urlUrl, search } = useSiteParams();
  const [expandedTypes, setExpandedTypes] = useStore("expandedTypes");
  const [collapsedModels, setCollapsedModels] = useStore("collapsedModels");

  const scrollTo = (location: string, model?: string) => {
    router.push(
      {
        query: {
          url,
          search,
          location,
        },
      },
      undefined,
      { shallow: true }
    );

    setTimeout(() => {
      document.getElementById(location)?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    if (urlUrl) {
      const newExpandedTypes = (expandedTypes[urlUrl] || []).concat([location]);
      setExpandedTypes({
        ...expandedTypes,
        [urlUrl]: newExpandedTypes,
      });

      if (model) {
        const newCollapsedModels = (collapsedModels[urlUrl] || []).filter(
          (x) => x !== model
        );

        setCollapsedModels({
          ...expandedTypes,
          [urlUrl]: newCollapsedModels,
        });
      } else {
        //if we don't know the model, let's just show all models, just in case.
        setCollapsedModels({
          ...expandedTypes,
          [urlUrl]: [],
        });
      }
    }
  };

  return scrollTo;
};
