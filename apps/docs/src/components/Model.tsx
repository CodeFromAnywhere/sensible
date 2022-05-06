import useStore from "../store";
import { isEndpoint } from "../util";
import EndpointContainer from "./EndpointContainer";
import TypeDefinitionContainer from "./TypeDefinitionContainer";
import { Svg } from "react-with-native";
import BsChevronUpIcon from "../../public/BsChevronUp.svg";
import { useSiteParams } from "../hooks/useSiteParams";
import { DefinitionObject, getDefinition } from "sensible-core";

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
  const { urlUrl } = useSiteParams();
  const [collapsedModels, setCollapsedModels] = useStore("collapsedModels");
  const isCollapsed = urlUrl
    ? !!collapsedModels[urlUrl]?.find((x) => x === modelKey)
    : false;

  const toggle = () => {
    if (urlUrl) {
      const newCollapsedModels = isCollapsed
        ? collapsedModels[urlUrl].filter((x) => x !== modelKey)
        : (collapsedModels[urlUrl] || []).concat([modelKey]);

      setCollapsedModels({
        ...collapsedModels,
        [urlUrl]: newCollapsedModels,
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

                    return definition && urlUrl && isValid ? (
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
