import { getDefinition } from "sensible-core";
import { Definition } from "typescript-json-schema";
import { useScrollTo } from "../hooks/useScrollTo";
import {
  DefinitionObject,
  getRefLink,
  getType,
  getTypeDefinitionString,
} from "../util";

const TypeDefinition = ({
  title,
  definition,
  model,
  allDefinitions,
}: {
  title?: string;
  model: string;
  definition: Definition | null;
  allDefinitions: DefinitionObject;
}) => {
  const reference = definition?.$ref;
  const refLink = getRefLink(reference);
  const properties = definition?.properties;
  const required = definition?.required;

  const scrollTo = useScrollTo();
  const refElement = refLink ? (
    <span
      className="cursor-pointer"
      onClick={() => {
        if (refLink) {
          scrollTo(refLink, model);
        }
      }}
    >
      {refLink}
    </span>
  ) : null;

  const propertyKeys = properties ? Object.keys(properties) : [];
  const typeColor = "text-lime-500";
  const propertyColor = "text-blue-500";
  const isObject = definition?.type === "object";

  return (
    <span>
      {title ? (
        <span>
          type <span className={typeColor}>{title}</span> =
        </span>
      ) : null}
      {isObject ? (
        <span>
          <span>&#123;</span>
          {propertyKeys.map((key) => {
            const propertyDefinition = getDefinition(properties?.[key]);
            const isRequired = required?.includes(key);
            const refLink = getRefLink(propertyDefinition?.$ref);
            const refDefinition = refLink
              ? getDefinition(allDefinitions[refLink])
              : null;

            const title = getTypeDefinitionString({
              name: refLink || "",
              definition: refDefinition,
              allDefinitions,
              model,
            });

            const refElement = refLink ? (
              <span
                className="cursor-pointer"
                onClick={() => {
                  if (refLink) {
                    scrollTo(refLink, model);
                  }
                }}
                title={title}
              >
                {refLink}
              </span>
            ) : null;

            const type = getType(propertyDefinition, allDefinitions, model);

            return (
              <span key={key} className="text-xs">
                <span className={propertyColor}>{key}</span>
                {isRequired ? "" : "?"}:{" "}
                <span className={typeColor}>{refElement || type}</span>
                {"; "}
              </span>
            );
          })}
          <span>&#125;</span>
        </span>
      ) : refLink ? (
        <span className={typeColor}>{refElement}</span>
      ) : (
        getType(definition, allDefinitions, model)
      )}
    </span>
  );
};

export default TypeDefinition;
