import React from "react";
import { Div } from "react-with-native";
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
    <Div className={"m-4 overflow-y-scroll lg:relative"}>
      {sections.map((section, index) => {
        <div>
          <label>{section.title}</label>
          {section.sections?.map((section, index) => {})}
        </div>;

        // const sections = section.sections?.filter((s) =>
        //   !search || search.length === 0
        //     ? true
        //     : s.path.includes(search.toLowerCase())
        // );
        // return sections?.length === 0 ? null : (
        // <Category key={index} title={section.title}>
        //   {sections.map((page, index) => {
        //     return <MenuItem key={index} page={page} />;
        //   })}
        // </Category>;
        // );
      })}
    </Div>
  );
};

export default Menu;
