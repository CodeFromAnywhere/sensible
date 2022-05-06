import useStore from "../store";
import { getQueryStrings, isEndpoint } from "../util/util";
import EndpointContainer from "./EndpointContainer";
import TypeDefinitionContainer from "./TypeDefinitionContainer";
import { Svg } from "react-with-native";
import BsChevronUpIcon from "../../public/BsChevronUp.svg";
import { DefinitionObject, getDefinition } from "sensible-core";
import { useRouter } from "react-with-native-router";

type SectionKey = "endpoints" | "types";
const Model = ({
  sections,
  modelKey,
}: {
  sections: {
    endpoints?: DefinitionObject | undefined;
    types?: DefinitionObject | undefined;
  };
  modelKey: string;
}) => {
  const router = useRouter();
  const { url } = getQueryStrings(router.query);
  const [collapsedModels, setCollapsedModels] = useStore("collapsedModels");
  const isCollapsed = url
    ? !!collapsedModels[url]?.find((x) => x === modelKey)
    : false;

  const toggle = () => {
    if (url) {
      const newCollapsedModels = isCollapsed
        ? collapsedModels[url].filter((x) => x !== modelKey)
        : (collapsedModels[url] || []).concat([modelKey]);

      setCollapsedModels({
        ...collapsedModels,
        [url]: newCollapsedModels,
      });
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-between w-full p-4 bg-gray-100 rounded my-3 cursor-pointer"
        onClick={toggle}
      >
        <h2 className="text-3xl font-bold">{modelKey}</h2>

        <Svg
          src={BsChevronUpIcon}
          className={`w-8 h-8 duration-500 animate-all ${
            !isCollapsed ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`${
          isCollapsed ? "h-0" : "min-h-fit"
        } transition-all ease-in overflow-clip duration-100`}
      >
        {[
          {
            key: "endpoints" as SectionKey,
            title: "Endpoints",
            filter: isEndpoint,
            component: EndpointContainer,
          },
          {
            key: "types" as SectionKey,
            title: "Types",
            component: TypeDefinitionContainer,
          },
        ].map((section) => {
          const definitionObject = sections[section.key];
          return (
            <div key={`${modelKey}.${section.key}`}>
              <h3 className="text-xl p-4 font-semibold">{section.title}</h3>
              <div>
                {definitionObject &&
                  Object.keys(definitionObject).map((definitionKey) => {
                    const definition = getDefinition(
                      definitionObject?.[definitionKey]
                    );

                    const isValid =
                      !section.filter || section.filter(definition);

                    return definition && url && isValid ? (
                      <section.component
                        key={`${modelKey}model_${definitionKey}${section.key}`}
                        model={modelKey}
                        id={definitionKey}
                        definition={definition}
                        allDefinitions={definitionObject}
                      />
                    ) : null;
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Model;
