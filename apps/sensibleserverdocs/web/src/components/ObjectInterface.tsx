import { DefinitionObject, getDefinition, getRefLink } from "../util";

const ObjectInterface = ({
  title,
  properties,
  reference,
  required,
}: {
  title?: string;
  properties: DefinitionObject | undefined;
  reference?: string;
  required?: string[];
}) => {
  const refLink = getRefLink(reference);
  const refElement = refLink ? (
    <a className="cursor-pointer" href={`#${refLink}`}>
      {refLink}
    </a>
  ) : null;

  const array = properties ? Object.keys(properties) : [];
  const typeColor = "text-lime-500";
  const propertyColor = "text-blue-500";
  const isObject = !refLink;
  return (
    <div className="mx-4">
      {title ? (
        <p>
          type <span className={typeColor}>{title}</span> =
          {isObject ? (
            <span>&#123;</span>
          ) : refLink ? (
            <span className={typeColor}>{refElement}</span>
          ) : null}
        </p>
      ) : null}
      <ul className="list-inside">
        {isObject &&
          array.map((key) => {
            const definition = getDefinition(properties?.[key]);
            const isRequired = required?.includes(key);
            const refLink = getRefLink(definition?.$ref);
            const refElement = refLink ? (
              <a className="cursor-pointer" href={`#${refLink}`}>
                {refLink}
              </a>
            ) : null;
            const type = definition?.enum?.length
              ? definition.enum.map((x) => `"${x}"`).join(" | ")
              : definition?.type;

            return (
              <li key={key} className="text-xs ml-4">
                <span className={propertyColor}>{key}</span>
                {isRequired ? "" : "?"}:{" "}
                <span className={typeColor}>{refElement || type}</span>
              </li>
            );
          })}
        {isObject ? <p>&#125;</p> : null}
      </ul>
    </div>
  );
};

export default ObjectInterface;
