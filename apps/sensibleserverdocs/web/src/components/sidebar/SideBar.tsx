import React from "react";
import Menu, { Section } from "./Menu";
import Search from "../Search";

const SideBar = ({ sections }: { sections: Section[] }) => {
  console.log({ sections });
  return (
    <div className="border-r border-gray-100 w-80 md:block hidden z-20 pl-4 pr-6">
      <Search />
      <Menu sections={sections} level={1} />
    </div>
  );
};

export default SideBar;
