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
  const [expanded, setExpanded] = useState(false);

  const propertyKeys = definition?.properties
    ? Object.keys(definition.properties)
    : [];

  const getFirstEnum = (key: string) =>
    getDefinition(definition?.properties?.[key])?.enum?.[0];

  const isPost = getFirstEnum("method") === "POST";
  const isGet = getFirstEnum("method") === "GET";
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
  return (
    <div id={id} className="border my-4 rounded-md px-4 pb-4">
      <div className={`flex items-center justify-between mt-4`}>
        <div className="flex items-center">
          <p
            className="text-xl cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            {id}
          </p>
          <div
            className="cursor-pointer ml-3"
            onClick={() => {
              const strippedHashtag = window.location.href.split("#")[0];
              navigator.clipboard.writeText(strippedHashtag + "#" + name);
              toast({
                title: "Copied",
                body: `You've copied the link to this endpoint`,
              });
            }}
          >
            <Svg src={AiOutlineCopyIcon} className="w-4 h-4" />
          </div>

          <div
            className="cursor-pointer ml-3"
            onClick={() => {
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

          <div
            className="cursor-pointer ml-3"
            onClick={() => {
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
        </div>

        <Svg
          src={BsChevronUpIcon}
          className={`w-8 h-8 duration-500 animate-all ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </div>

      <div className={expanded ? "opacity-100" : "opacity-0"}>
        <div
          className={`${
            expanded ? "max-h-[1920px]" : "max-h-0 h-0"
          } transition-all ease-in overflow-clip duration-1000`}
        >
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
