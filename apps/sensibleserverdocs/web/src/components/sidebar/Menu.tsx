import React from "react";
import { useRouter } from "react-with-native-router";
import useStore from "../../store";
import { Svg } from "react-with-native";
import BsChevronUpIcon from "../../../public/BsChevronUp.svg";
import { useScrollTo } from "../../hooks/useScrollTo";
import { useSiteParams } from "../../hooks/useSiteParams";

export type Section = {
  title: string;
  key: string;
  /**
   * if href is undefined, make this expand/collapse
   */
  href?: string;
  sections?: Section[];
};

const Menu = ({
  sections,
  stack = [],
}: {
  stack?: string[];
  sections: Section[];
}) => {
  const scrollTo = useScrollTo();
  const { urlUrl } = useSiteParams();
  const [collapsedMenus, setCollapsedMenus] = useStore("collapsedMenus");

  return (
    <ul className="ml-4 select-none">
      {sections.map((section, index) => {
        const isCollapsed = urlUrl
          ? !!collapsedMenus[urlUrl]?.find((x) => x === section.key)
          : false;

        const toggle = () => {
          if (urlUrl) {
            const newCollapsedModels = isCollapsed
              ? collapsedMenus[urlUrl].filter((x) => x !== section.key)
              : (collapsedMenus[urlUrl] || []).concat([section.key]);

            setCollapsedMenus({
              ...collapsedMenus,
              [urlUrl]: newCollapsedModels,
            });
          }
        };

        const hasSections = section.sections && section.sections.length > 0;

        const arrowElement = (
          <Svg
            src={BsChevronUpIcon}
            className={`ml-2 mt-1 w-4 h-4 duration-500 animate-all ${
              !isCollapsed ? "rotate-180" : ""
            }`}
          />
        );
        return (
          <li key={index}>
            <div
              onClick={() => {
                if (section.href) {
                  console.log(
                    "I'm afraid section title is not the model name:",
                    stack[0]
                  );

                  scrollTo(section.href, stack[0]);
                } else {
                  toggle();
                }
              }}
              className={`cursor-pointer flex justify-between hover:bg-grey-100 p-2 ${
                stack.length === 0
                  ? "text-gray-700 mr-2 bg-gray-100 rounded mb-2 font-bold"
                  : stack.length === 1 && hasSections
                  ? "text-gray-400 mr-2 mb-2 font-bold hover:text-gray-700"
                  : "text-gray-500 hover:text-gray-700 hover:underline"
              }`}
            >
              {section.title}
              {hasSections ? arrowElement : null}
            </div>
            {hasSections && !isCollapsed ? (
              <Menu
                sections={section.sections!}
                stack={stack.concat([section.title])}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
