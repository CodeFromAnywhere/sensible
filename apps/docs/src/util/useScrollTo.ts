import { useRouter } from "react-with-native-router";
import useStore from "../store";
import { getQueryStrings, shallowPush } from "./util";

/**
 * This hook returns a function that lets you scroll to any type/model/endpoint and open that thing if it was closed.
 *
 * It seems overkill, but there are too many models to quickly scroll through.
 *
 * todo: to simplify this we could opt to remove the collapsing and opening and just create pages out of the menus.
 * It would simplify everything a lot if the url was /king.leckrapi.xyz/model/User/login.
 * It would probably also be better for adding more functionality later (recents, errors, examples, comments, etc)
 * It could also be better for SEO.
 *
 * If I get into trouble with this, immedeately refactor. Otherwise refactor once I got more time
 */
export const useScrollTo = () => {
  const router = useRouter();
  const { url, search } = getQueryStrings(router.query);

  const [expandedTypes, setExpandedTypes] = useStore("expandedTypes");
  const [collapsedModels, setCollapsedModels] = useStore("collapsedModels");

  const scrollTo = (location: string, model?: string) => {
    shallowPush(router, "location", location);

    setTimeout(() => {
      document.getElementById(location)?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    if (url) {
      const newExpandedTypes = (expandedTypes[url] || []).concat([location]);
      setExpandedTypes({
        ...expandedTypes,
        [url]: newExpandedTypes,
      });

      if (model) {
        const newCollapsedModels = (collapsedModels[url] || []).filter(
          (x) => x !== model
        );

        setCollapsedModels({
          ...expandedTypes,
          [url]: newCollapsedModels,
        });
      } else {
        //if we don't know the model, let's just show all models, just in case.
        setCollapsedModels({
          ...expandedTypes,
          [url]: [],
        });
      }
    }
  };

  return scrollTo;
};
