import { useRouter } from "react-with-native-router";
import useStore from "../store";
import { useSiteParams } from "./useSiteParams";

export const useScrollTo = () => {
  const router = useRouter();
  const { apiString, searchString, apiUrl } = useSiteParams();
  const [expandedTypes, setExpandedTypes] = useStore("expandedTypes");
  const [collapsedModels, setCollapsedModels] = useStore("collapsedModels");

  const scrollTo = (location: string, model?: string) => {
    router.push(
      {
        query: {
          api: apiString,
          search: searchString,
          location,
        },
      },
      undefined,
      { shallow: true }
    );

    setTimeout(() => {
      document.getElementById(location)?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    if (apiUrl) {
      const newExpandedTypes = (expandedTypes[apiUrl] || []).concat([location]);
      setExpandedTypes({
        ...expandedTypes,
        [apiUrl]: newExpandedTypes,
      });

      if (model) {
        const newCollapsedModels = (collapsedModels[apiUrl] || []).filter(
          (x) => x !== model
        );

        setCollapsedModels({
          ...expandedTypes,
          [apiUrl]: newCollapsedModels,
        });
      } else {
        //if we don't know the model, let's just show all models, just in case.
        setCollapsedModels({
          ...expandedTypes,
          [apiUrl]: [],
        });
      }
    }
  };

  return scrollTo;
};
