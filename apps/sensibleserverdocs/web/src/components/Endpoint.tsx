import * as TJS from "typescript-json-schema";
import AiOutlineCopyIcon from "../../public/AiOutlineCopy.svg";
import { Svg } from "react-with-native";
import { toast } from "react-with-native-notification";
import "react-toastify/dist/ReactToastify.css";
import BsCodeIcon from "../../public/BsCode.svg";
import VscTerminalCmdIcon from "../../public/VscTerminalCmd.svg";
import { getDefinition } from "../util";
import Property from "./Property";
import { useState } from "react";
import BsChevronUpIcon from "../../public/BsChevronUp.svg";
import BsChevronDownIcon from "../../public/BsChevronDown.svg";
import useStore from "../store";

const getTypeInterfaceString = ({
  name,
  definition,
  properties,
}: {
  name: string;
  definition: any;
  properties: string[];
}) => {
  return `interface ${name} {\n\t${properties
    .map(
      (key) => `${key}: ${getDefinition(definition?.properties?.[key])?.type}`
    )
    .join(`\n\t`)}\n}`;
};
const Endpoint = ({
  definition,
  id,
  search,
  apiUrl,
}: {
  definition: TJS.Definition;
  id: string;
  search: string;
  apiUrl: string;
}) => {
  const [expandedTypes, setExpandedTypes] = useStore("expandedTypes");

  const getFirstEnum = (key: string): string | undefined =>
    getDefinition(definition?.properties?.[key])?.enum?.[0] as
      | string
      | undefined;

  const method = getFirstEnum("method");
  const path = getFirstEnum("path");
  const identifier = `${method}:${path}`;

  const isExpanded = apiUrl
    ? !!expandedTypes[apiUrl]?.find((x) => x === identifier)
    : false;

  const toggle = () => {
    if (apiUrl) {
      const newCollapsedModels = isExpanded
        ? expandedTypes[apiUrl].filter((x) => x !== identifier)
        : (expandedTypes[apiUrl] || []).concat([identifier]);

      setExpandedTypes({
        ...expandedTypes,
        [apiUrl]: newCollapsedModels,
      });
    }
  };

  const propertyKeys = definition?.properties
    ? Object.keys(definition.properties)
    : [];

  const description = definition?.description;

  const itemsIcon = (definition?.items as any)?.icon;
  const isPost = method === "POST";
  const isGet = method === "GET";

  const methodBg = isPost ? "bg-green-500" : "bg-blue-500";
  const methodBgHover = isPost ? "hover:bg-green-500" : "hover:bg-blue-500";
  const iconElement = itemsIcon ? (
    <p className="text-3xl">{itemsIcon}</p>
  ) : (
    <div
      className={`w-8 h-8 ${methodBg} rounded-full flex items-center justify-center`}
    >
      {id.substring(0, 1)}
    </div>
  );
  const methodOptions = isPost ? " -X POST" : "";

  const getBody = definition?.properties; //&&
  // objectMap(definition?.properties, (value, key) => {
  //   return bodyInput[name][key];
  // });

  const bodyOptions = ""; // isPost ? getBody : "";

  const query = ""; //isGet ? toQueryString(getBody) : "";

  /*
 : section === "models"
      ? getTypeInterfaceString({
          name,
          definition,
          properties,
        })
      : section === "other"
      ? getTypeInterfaceString({
          name,
          definition,
          properties,
        })
      : "Invalid section";*/

  const methodElement = (
    <div
      className={`ml-2 px-1 py-2 text-xs w-20 flex justify-center rounded-md ${methodBg}`}
    >
      {method}
    </div>
  );

  const titleElement = (
    <p className="ml-2 text-lg">
      /{path} ({id})
    </p>
  );

  const copyLinkElement = (
    <div
      className={`ml-3 cursor-pointer rounded-full p-2 ${methodBgHover}`}
      onClick={(e) => {
        e.stopPropagation();

        const strippedHashtag = window.location.href.split("#")[0];
        navigator.clipboard.writeText(strippedHashtag + "#" + identifier);
        toast({
          title: "Copied",
          body: `You've copied the link to this endpoint`,
        });
      }}
    >
      <Svg src={AiOutlineCopyIcon} className="w-4 h-4" />
    </div>
  );
  const copyCodeElement = (
    <div
      className={`cursor-pointer rounded-full p-2 ${methodBgHover}`}
      onClick={(e) => {
        e.stopPropagation();

        const code = `api()`;

        navigator.clipboard.writeText(code);
        toast({
          title: "Copied",
          body: `You've copied the code for this endpoint`,
        });
      }}
    >
      <Svg src={BsCodeIcon} className="w-4 h-4" />
    </div>
  );

  const copyCurlElement = (
    <div
      className={`cursor-pointer rounded-full p-2 ${methodBgHover}`}
      onClick={(e) => {
        e.stopPropagation();

        const fullPath = apiUrl + "/" + getFirstEnum("path") + query;
        const command = `curl${methodOptions}${bodyOptions} '${fullPath}'`;
        navigator.clipboard.writeText(command);
        toast({
          title: "Copied",
          body: `You've copied the curl command for this endpoint`,
        });
      }}
    >
      <Svg src={VscTerminalCmdIcon} className="w-4 h-4" />
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
  return (
    <div
      id={identifier}
      className="px-4 pb-4 my-4 border rounded-md cursor-pointer"
      onClick={toggle}
    >
      <div className={`flex items-center justify-between mt-4`}>
        <div className={`flex items-center flex-1`}>
          {iconElement}
          {methodElement}
          {titleElement}
          {descriptionElement}
        </div>
        {copyLinkElement}
        {copyCodeElement}
        {copyCurlElement}
        {arrowElement}
      </div>

      <div className={isExpanded ? "opacity-100" : "opacity-0"}>
        <div
          className={`${
            isExpanded ? "max-h-[1920px]" : "max-h-0 h-0"
          } transition-all ease-in overflow-clip duration-1000`}
        >
          <p>{description}</p>

          {propertyKeys.map((propertyKey) => {
            const property = getDefinition(
              definition?.properties?.[propertyKey]
            );
            return (
              <Property
                key={`${id}_${propertyKey}`}
                propertyName={propertyKey}
                property={property}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Endpoint;
