import React from "react";
import { Div } from "react-with-native";
import Menu, { Section } from "./Menu";
// import Search from "../../Search";

const SideBar = ({ sections }: { sections: Section[] }) => {
  return (
    <Div className="flex-row border-r border-gray-200 w-64 max-h-full justify-items-center bg-[#fefefe] md:block hidden z-20 pt-24">
      {/* <Search /> */}
      <Menu sections={sections} />
    </Div>
  );
};

export default SideBar;
