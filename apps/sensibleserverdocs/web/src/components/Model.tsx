import { useState } from "react";
import useStore from "../store";
import { getDefinition } from "../util";
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
  const isCollapsed = collapsedModels.find((x) => x === modelKey);

  return (
    <div>
      <div
        className="cursor-pointer flex px-4 items-center w-full justify-between pt-10"
        onClick={() => {
          const newCollapsedModels = isCollapsed
            ? collapsedModels.filter((x) => x !== modelKey)
            : collapsedModels.concat([modelKey]);
          setCollapsedModels(newCollapsedModels);
        }}
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
            return definition && apiUrl ? (
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
