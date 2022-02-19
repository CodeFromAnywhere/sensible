import React from "react";
import { Div } from "react-with-native";
import Menu, { Section } from "./Menu";
// import Search from "../../Search";

const sectionsTEST: Section[] = [
  {
    title: "t1",
    sections: [
      {
        title: "e1",
        sections: [
          {
            title: "a1",
            sections: [],
          },
          {
            title: "a2",
            sections: [],
          },
          {
            title: "a3",
            sections: [],
          },
        ],
      },
      {
        title: "e2",
        sections: [],
      },
      {
        title: "e3",
        sections: [],
      },
    ],
  },
  {
    title: "t2",
    sections: [],
  },
  {
    title: "t3",
    sections: [],
  },
];

const SideBar = ({ sections }: { sections: Section[] }) => {
  return (
    <Div className="flex-row border-r border-gray-200 w-64 max-h-full justify-items-center bg-[#fefefe] md:block hidden z-20 pt-24">
      {/* <Search /> */}
      <Menu sections={sectionsTEST} />
    </Div>
  );
};

export default SideBar;
