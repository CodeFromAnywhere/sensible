import { Div } from "react-with-native";
import { Item } from "react-with-native-select";
import { api } from "../api";
import { CodeLink } from "../components";
import { Form, InputValues, makeField } from "../components/Form";
import useStore from "../store";
import { RWNPage } from "../types";

const fields = [
  makeField("text", {
    field: "email",
    title: "Email",
  }),
  makeField("password", {
    field: "password",
    title: "Password",
  }),
];

// Now your form can be rendered like this
// Make sure to provide the generic based on the inputs type interfaces
// otherwise your form won't be typesafe!

const Page: RWNPage = () => {
  const [loginToken, setLoginToken] = useStore("loginToken");
  return (
    <Div scroll className="py-4 px-8 lg:px-20">
      <Form<{
        email: InputValues["text"];
        password: InputValues["password"];
      }>
        title="Login"
        fields={fields}
        onSubmit={async (values, resolve, reject) => {
          //do something with those values

          const response = await api("login", "POST", values);
          if (response.success && response.loginToken) {
            resolve(response.response);
            setLoginToken(response.loginToken);
          } else {
            reject(response.response);
          }
        }}
      />
    </Div>
  );
};

Page.options = {};

export default Page;
