import React from "react";
import { Div, Pressable } from "react-with-native";
import { useRouter } from "react-with-native-router";
// import { PageType } from "./Menu";

// interface MenuItemProps {
//   page: PageType;
// }

const MenuItem = () => {
  const router = useRouter();
  return (
    <Div className="w-full text-gray-600 cursor-pointer active:text-brand_light hover:text-brand">
      {/* <Pressable
        className="w-full px-4 py-1 text-left hover:border-l-2 border-dark_1_section"
        onClick={() => router.push(`/docs/${page.path}`)}
      >
        {page.label}
      </Pressable> */}
    </Div>
  );
};

export default MenuItem;
