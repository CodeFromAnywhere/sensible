import { DefinitionObject, getDefinition } from "../util";

const ObjectComponent = ({ properties }: { properties: DefinitionObject }) => {
  const array = Object.keys(properties);
  return (
    <ul className="list-disc list-inside">
      {array.map((key) => {
        const definition = getDefinition(properties[key]);
        return (
          <li key={key} className="text-xs">
            {key}: {definition?.type}
          </li>
        );
      })}
    </ul>
  );
};

export default ObjectComponent;
