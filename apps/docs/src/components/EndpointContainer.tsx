import * as TJS from "typescript-json-schema";
import AiOutlineCopyIcon from "../../public/AiOutlineCopy.svg";
import { Svg } from "react-with-native";
import { toast } from "react-with-native-notification";
import "react-toastify/dist/ReactToastify.css";
import BsCodeIcon from "../../public/BsCode.svg";
import VscTerminalCmdIcon from "../../public/VscTerminalCmd.svg";
import { toQueryString } from "../util";
import BsChevronUpIcon from "../../public/BsChevronUp.svg";
import useStore from "../store";
import { useSiteParams } from "../hooks/useSiteParams";

import TypeDefinition from "./TypeDefinition";
import { DefinitionObject, getDefinition } from "sensible-core";
const Endpoint = ({
  definition,
  id,
  allDefinitions,
  model,
}: {
  definition: TJS.Definition;
  id: string;
  allDefinitions: DefinitionObject;
  model: string;
}) => {
  const { urlUrl, searchString, locationString } = useSiteParams();

  const getFirstEnum = (key: string): string | undefined =>
    getDefinition(definition?.properties?.[key])?.enum?.[0] as
      | string
      | undefined;

  const method = getFirstEnum("method");
  const path = getFirstEnum("path");
  const identifier = `${method}:${path}`;

  const [expandedTypes, setExpandedTypes] = useStore("expandedTypes");

  const isExpanded = urlUrl
    ? !!expandedTypes[urlUrl]?.find((x) => x === identifier)
    : false;

  const toggle = () => {
    if (urlUrl) {
      const newExpandedTypes = isExpanded
        ? expandedTypes[urlUrl].filter((x) => x !== identifier)
        : (expandedTypes[urlUrl] || []).concat([identifier]);

      setExpandedTypes({
        ...expandedTypes,
        [urlUrl]: newExpandedTypes,
      });
    }
  };

  const description = definition?.description;

  const itemsIcon = (definition?.items as any)?.icon;
  const isPost = method === "POST";
  const isGet = method === "GET";

  const methodBg = isPost ? "bg-greenish" : "bg-blueish";
  const methodBgHover = isPost ? "hover:bg-greenish" : "hover:bg-blueish";
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
  const bodyOptions = ""; // isPost ? getBody : "";
  const query = ""; //isGet ? toQueryString(getBody) : "";

  const methodElement = (
    <div
      className={`ml-2 px-1 py-2 text-xs w-20 flex justify-center rounded-md ${methodBg}`}
    >
      {method}
    </div>
  );

  const titleElement = (
    <p className="ml-2 text-lg">
      {path ? <span className="pr-4">/{path}</span> : null}
      <span>({id})</span>
    </p>
  );

  const copyLinkElement = (
    <div
      className={`ml-3 cursor-pointer rounded-full p-2 ${methodBgHover}`}
      onClick={(e) => {
        e.stopPropagation();

        const query = {
          search: searchString,
          location: identifier,
        };

        const url =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          toQueryString(query);
        navigator.clipboard.writeText(url);
        toast({
          title: "Copied",
          body: `Copied ${url}`,
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

        const fullPath = urlUrl + "/" + getFirstEnum("path") + query;
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

  const body = getDefinition(definition?.properties?.body);
  const response = getDefinition(definition?.properties?.response);

  const expandedDescriptionElement =
    description && isExpanded ? <p className="mt-6">{description}</p> : null;

  const bodyElement = (
    <div className={"my-4"}>
      <TypeDefinition
        model={model}
        definition={body}
        key={`${identifier}body`}
        title="Body"
        allDefinitions={allDefinitions}
      />
    </div>
  );
  const responseElement = (
    <div>
      <TypeDefinition
        key={`${identifier}response`}
        model={model}
        title="Response"
        definition={response}
        allDefinitions={allDefinitions}
      />
    </div>
  );

  const isSelected = locationString === identifier;
  return (
    <div
      id={identifier}
      className={`mb-4 border rounded-md ${
        isSelected ? `animate-pulse-bg-once ${methodBg}` : ""
      }`}
    >
      {/* Endpoint Header */}
      <div
        className={`flex items-center justify-between p-4 cursor-pointer`}
        onClick={toggle}
      >
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

      <div className={`${isExpanded ? "opacity-100" : "opacity-0"}`}>
        <div
          className={`${
            isExpanded ? "max-h-[1920px]" : "max-h-0 h-0"
          } transition-all ease-in overflow-clip duration-1000`}
        >
          <div className="mx-4 mb-4">
            {expandedDescriptionElement}
            {bodyElement}
            {responseElement}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Endpoint;
