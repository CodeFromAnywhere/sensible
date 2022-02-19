import { useState } from "react";
import useStore from "../store";
import { getDefinition, isEndpoint } from "../util";
import Endpoint from "./Endpoint";
import { Svg } from "react-with-native";
import BsChevronUpIcon from "../../public/BsChevronUp.svg";

const Model = ({
  definitions,
  modelKey,
  apiUrl,
  searchString,
}: {
  definitions: any;
  modelKey: string;
  apiUrl: string | null;
  searchString: string;
}) => {
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
        className="flex items-center justify-between w-full px-4 pt-10 cursor-pointer"
        onClick={toggle}
      >
        <h2 className="text-3xl">{modelKey}</h2>

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
        {definitions.endpoints &&
          Object.keys(definitions.endpoints).map((endpointKey) => {
            const definition = getDefinition(
              definitions.endpoints?.[endpointKey]
            );

            return definition && apiUrl && isEndpoint(definition) ? (
              <Endpoint
                apiUrl={apiUrl}
                search={searchString}
                key={`${modelKey}model_${endpointKey}endpoint`}
                id={endpointKey}
                definition={definition}
              />
            ) : null;
          })}
      </div>
    </div>
  );
};

export default Model;
