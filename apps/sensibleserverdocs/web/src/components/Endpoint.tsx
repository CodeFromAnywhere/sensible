import * as TJS from "typescript-json-schema";
import AiOutlineCopyIcon from "../../public/AiOutlineCopy.svg";
import { Svg } from "react-with-native";
import { toast } from "react-with-native-notification";
import "react-toastify/dist/ReactToastify.css";
import BsCodeIcon from "../../public/BsCode.svg";
import VscTerminalCmdIcon from "../../public/VscTerminalCmd.svg";
import { getDefinition } from "../util";
import Property from "./Property";

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
    <div id={id}>
      <div className="flex items-center mt-4">
        <p className="text-xl">{id}</p>
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
      <p className="text-sm">
        {propertyKeys.map((propertyKey) => {
          const property = getDefinition(definition?.properties?.[propertyKey]);
          return (
            <Property
              key={`${id}_${propertyKey}`}
              propertyName={propertyKey}
              property={property}
            />
          );
        })}
      </p>
    </div>
  );
};
export default Endpoint;
