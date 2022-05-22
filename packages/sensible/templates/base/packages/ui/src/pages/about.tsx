import { Div, P } from "react-with-native";
import { useRouter } from "react-with-native-router";

import Button from "../components";
import useStore from "../store";

const AboutPage = () => {
  const [name] = useStore("name");
  const router = useRouter();
  return (
    <Div>
      <P>Hey {name}, I am Sensible!</P>
      <Button title="Go back" onClick={() => router.push("/")} />
    </Div>
  );
};

export default AboutPage;
