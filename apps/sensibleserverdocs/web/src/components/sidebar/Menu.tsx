import React from "react";
import Category from "./Category";
import MenuItem from "./MenuItem";
import { useRouter } from "react-with-native-router";

interface MenuProps {
  sections: Section[];
}

export type Section = {
  title: string;
  /**
   * if href is undefined, make this expand/collapse
   */
  href?: string;
  sections?: Section[];
};

const Menu = ({ sections }: MenuProps) => {
  const router = useRouter();
  const search = (router.query.search || "") as string;

  return (
    <ul>
      {sections.map((section, index) => {
        const hasSections = section.sections && section.sections.length > 0;
        return (
          <li key={index}>
            <a href={section.href}>{section.title}</a>
            {hasSections ? <Menu sections={section.sections!} /> : null}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
