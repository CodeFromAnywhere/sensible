import { Div, P } from "react-with-native";
import Menu from "../components/Menu";
import { RWNPage } from "../types";

const Page: RWNPage = () => {
  return (
    <Div className="py-4 w-full" scroll>
      <Menu />
    </Div>
  );
};

Page.options = {
  hideFromMenu: true,
};

export default Page;
