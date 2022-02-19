import React from "react";
import { Div, H2 } from "react-with-native";

interface CategoryProps {
  children: React.ReactNode;
  title: string;
}

const Category = ({ children, title }: CategoryProps) => {
  return (
    <Div className="p-4">
      <H2 className="text-lg">{title}</H2>
      {children}
    </Div>
  );
};

export default Category;
