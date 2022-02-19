import * as TJS from "typescript-json-schema";
import ObjectComponent from "./ObjectComponent";

const Property = ({
  property,
  propertyName,
}: {
  property: TJS.Definition | null;
  propertyName: string;
}) => {
  const refLink = property?.$ref?.split("/").pop();

  const content = refLink ? (
    <a href={`#${refLink}`}>{refLink}</a>
  ) : property?.type === "string" ? (
    property.enum ? (
      property.enum.join(",")
    ) : (
      property.type
    )
  ) : property?.type === "object" ? (
    <ObjectComponent properties={property.properties!} />
  ) : (
    `Unknown type: ${property?.type}`
  );
  return property ? (
    <div>
      <b>{propertyName}:</b>
      {content}
    </div>
  ) : null;
};

export default Property;
