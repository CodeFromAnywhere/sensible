import { useState } from "react";
import useStore from "../store";
import { getDefinition, isEndpoint } from "../util";
import Endpoint from "./Endpoint";
import TypeDefinition from "./TypeDefinition";
import { Svg } from "react-with-native";
import BsChevronUpIcon from "../../public/BsChevronUp.svg";
import { useSiteParams } from "../hooks/useSiteParams";

const Model = ({
  definitions,
  modelKey,
}: {
  definitions: any;
  modelKey: string;
}) => {
  const { apiUrl } = useSiteParams();
  const [collapsedModels, setCollapsedModels] = useStore("collapsedModels");
  const isCollapsed = apiUrl
    ? !!collapsedModels[apiUrl]?.find((x) => x === modelKey)
    : false;

  const toggle = () => {
    if (apiUrl) {
      const newCollapsedModels = isCollapsed
        ? collapsedModels[apiUrl].filter((x) => x !== modelKey)
        : (collapsedModels[apiUrl] || []).concat([modelKey]);

      setCollapsedModels({
        ...collapsedModels,
        [apiUrl]: newCollapsedModels,
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
            key: "endpoints",
            title: "Endpoints",
            filter: isEndpoint,
            component: Endpoint,
          },
          { key: "types", title: "Types", component: TypeDefinition },
        ].map((section) => {
          return (
            <div key={`${modelKey}.${section.key}`}>
              <h3 className="text-xl p-4 font-semibold">{section.title}</h3>
              <div>
                {definitions[section.key] &&
                  Object.keys(definitions[section.key]).map((key) => {
                    const definition = getDefinition(
                      definitions[section.key]?.[key]
                    );

                    const isValid =
                      !section.filter || section.filter(definition);

                    return definition && apiUrl && isValid ? (
                      <section.component
                        key={`${modelKey}model_${key}${section.key}`}
                        id={key}
                        definition={definition}
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
