import { Div, P, Input } from "react-with-native";
import { useRouter } from "react-with-native-router";
import Button from "../components";
import useStore from "../store";

const HomePage = () => {
  const [name, setName] = useStore("name");
  const router = useRouter();
  return (
    <Div>
      <P>Hello World!</P>

      <P>What's your name?</P>
      <Input
        className="border p-2"
        type="text"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        native={{ onChangeText: (text) => setName(text) }}
      />

      <Button title="Contact" onClick={() => router.push("contact")} />
      <Button title="About" onClick={() => router.push("about")} />
    </Div>
  );
};

export default HomePage;
