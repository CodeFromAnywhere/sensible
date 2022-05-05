import React from "react";
import Menu, { Section } from "./Menu";
import Search from "../Search";
import { useDocsQuery } from "../../hooks/useDocsQuery";
import { getDocs, getFirstEnum, isEndpoint, notEmpty } from "../../util";
import { getDefinition } from "sensible-core";

const SideBar = () => {
  const docs = useDocsQuery();
  const schema = getDocs(docs)?.schema;
  const modelKeys = schema ? Object.keys(schema) : [];
  const sections = modelKeys.map((modelKey) => {
    const model = schema?.[modelKey];

    const endpointSections = model?.endpoints
      ? Object.keys(model.endpoints)
          .map((endpointKey) => {
            const definition = getDefinition(model?.endpoints?.[endpointKey]);

            const path = getFirstEnum(definition, "path");
            const method = getFirstEnum(definition, "method");

            return isEndpoint(definition)
              ? {
                  title: endpointKey,
                  key: `${modelKey}.${endpointKey}`,
                  href: `${method}:${path}`,
                }
              : null;
          })
          .filter(notEmpty)
      : [];

    const typeSections = model?.types
      ? Object.keys(model.types).map((typeKey) => {
          return {
            title: typeKey,
            key: `${modelKey}.${typeKey}`,
            href: typeKey,
          };
        })
      : [];

    const modelSections: Section = {
      key: modelKey,
      title: modelKey,
      sections: [
        {
          title: "Endpoints",
          sections: endpointSections,
          key: `${modelKey}.Endpoints`,
        },
        {
          title: "Types",
          sections: typeSections,
          key: `${modelKey}.Types`,
        },
      ],
    };
    return modelSections;
  });

  return (
    <div className="relative border-r border-gray-100 w-full block z-20 pl-4 pr-6">
      <div className="sticky top-0 pt-0 bg-white z-10">
        <Search />
      </div>
      <Menu sections={sections} />
    </div>
  );
};

export default SideBar;
