import * as TJS from "typescript-json-schema";
import { Svg } from "react-with-native";
import { toast } from "react-with-native-notification";
import BsCodeIcon from "../../public/BsCode.svg";
import { getQueryStrings, getTypeDefinitionString } from "../util/util";
import BsChevronUpIcon from "../../public/BsChevronUp.svg";
import useStore from "../store";
import TypeDefinition from "./TypeDefinition";
import { DefinitionObject } from "sensible-core";
import { useRouter } from "react-with-native-router";

const TypeDefinitionContainer = ({
  definition,
  id,
  allDefinitions,
  model,
}: {
  model: string;
  allDefinitions: DefinitionObject;
  definition: TJS.Definition;
  id: string;
}) => {
  const router = useRouter();
  const { url, location } = getQueryStrings(router.query);

  const [expandedTypes, setExpandedTypes] = useStore("expandedTypes");

  const identifier = id;

  const isExpanded = url
    ? !!expandedTypes[url]?.find((x) => x === identifier)
    : false;

  const toggle = () => {
    if (url) {
      const newExpandedTypes = isExpanded
        ? expandedTypes[url].filter((x) => x !== identifier)
        : (expandedTypes[url] || []).concat([identifier]);

      setExpandedTypes({
        ...expandedTypes,
        [url]: newExpandedTypes,
      });
    }
  };

  const description = definition?.description;

  const itemsIcon = (definition?.items as any)?.icon;

  const iconElement = itemsIcon ? (
    <p className="text-3xl">{itemsIcon}</p>
  ) : (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center`}>
      {id.substring(0, 1)}
    </div>
  );

  const titleElement = <p className="ml-2 text-lg">{identifier}</p>;

  const copyCodeElement = (
    <div
      className={`cursor-pointer rounded-full p-2`}
      onClick={(e) => {
        e.stopPropagation();

        const code = getTypeDefinitionString({
          name: id,
          definition,
          allDefinitions,
          model,
        });

        navigator.clipboard.writeText(code);
        toast({
          title: "Copied",
          body: `You've copied the code for this type`,
        });
      }}
    >
      <Svg src={BsCodeIcon} className="w-4 h-4" />
    </div>
  );

  const descriptionElement =
    description && !isExpanded ? (
      <p className="ml-4 text-xs italic line-clamp-2 flex-1">{description}</p>
    ) : null;

  const arrowElement = (
    <Svg
      src={BsChevronUpIcon}
      className={`ml-2 w-8 h-8 duration-500 animate-all ${
        isExpanded ? "rotate-180" : ""
      }`}
    />
  );

  const expandedDescriptionElement =
    description && isExpanded ? <p className="mt-6">{description}</p> : null;

  const isSelected = identifier === location;

  return (
    <div
      id={identifier}
      className={`mb-4 border rounded-md ${
        isSelected ? `animate-pulse-bg-once bg-blueish` : ""
      }`}
    >
      {/* Endpoint Header */}
      <div
        className={`flex items-center justify-between p-4 cursor-pointer`}
        onClick={toggle}
      >
        <div className={`flex items-center flex-1`}>
          {iconElement}
          {titleElement}
          {descriptionElement}
        </div>
        {copyCodeElement}
        {arrowElement}
      </div>

      <div className={`${isExpanded ? "opacity-100" : "opacity-0"}`}>
        <div
          className={`${
            isExpanded ? "max-h-[1920px]" : "max-h-0 h-0"
          } transition-all ease-in overflow-clip duration-1000`}
        >
          <div className="mx-4 mb-4">
            {expandedDescriptionElement}
            <TypeDefinition
              definition={definition}
              allDefinitions={allDefinitions}
              model={model}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TypeDefinitionContainer;
