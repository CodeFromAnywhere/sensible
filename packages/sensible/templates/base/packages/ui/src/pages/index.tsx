import { Div, Input, P } from "react-with-native";
import UI from "react-with-native-ui";
import { CodeLink } from "../components";
import useStore from "../store";
import { RWNPage } from "../types";

const Page: RWNPage = () => {
  const [name, setName] = useStore("name");
  const [email, setEmail] = useStore("email");
  return (
    <Div className="p-4 lg:p-20">
      <Div className="flex flex-row justify-end">
        <CodeLink pageKey="index" />
      </Div>
      <P>
        Welcome to this demo. This demo runs on React with Next.js as well as on
        React Native with Expo.
      </P>

      <Div className="bg-gray-200 rounded-xl p-4">
        <P>Your name:</P>
        <Input
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          native={{ onChangeText: setName }}
          className={UI.input}
        />

        <P>Your email:</P>
        <Input
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          native={{ onChangeText: setName }}
          className={UI.input}
        />
      </Div>
    </Div>
  );
};

Page.options = {
  title: "Home",
};

export default Page;
