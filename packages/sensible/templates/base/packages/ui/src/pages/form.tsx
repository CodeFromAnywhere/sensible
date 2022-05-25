import { Div } from "react-with-native";
import { Item } from "react-with-native-select";
import { CodeLink } from "../components";
import { Form, InputValues, makeField } from "../components/Form";
import useStore from "../store";
import { RWNPage } from "../types";

const options: Item<string>[] = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
];

const fields = [
  makeField("text", {
    field: "text",
    title: "Text",
    hasError: (value) => (value.length === 0 ? "Please fill in a text" : false),
  }),
  makeField("password", {
    field: "password",
    title: "Password",
    hasError: (value) =>
      value.length === 0 ? "Please fill in a password" : false,
  }),

  makeField("date", { field: "date", title: "Date" }),
  makeField("datetime", { field: "datetime", title: "Datetime" }),
  makeField("number", { field: "number", title: "Number" }),
  makeField("phone", { field: "phone", title: "Phone" }),
  makeField("select", {
    field: "select",
    title: "Select",
    extra: {
      options,
    },
  }),

  makeField("selectMultiple", {
    field: "selectMultiple",
    title: "Select multiple",
    extra: {
      options,
    },
  }),
  makeField("stars", { field: "stars", title: "Stars" }),
  makeField("textArea", { field: "textArea", title: "Text area" }),
  makeField("time", { field: "time", title: "Time" }),
  makeField("toggle", {
    field: "toggle",
    title: "Toggle",
    extra: { label: "Toggle this on or off" },
  }),
  makeField("labels", { field: "labels", title: "Labels input" }),
];

// Now your form can be rendered like this
// Make sure to provide the generic based on the inputs type interfaces
// otherwise your form won't be typesafe!

const Page: RWNPage = () => {
  const [name] = useStore("name");
  return (
    <Div scroll className="py-4 px-8 lg:px-20">
      <Div className="flex flex-row justify-end">
        <CodeLink pageKey="form" />
      </Div>
      <Form<{
        text: InputValues["text"];
        password: InputValues["password"];
        date: InputValues["date"];
        datetime: InputValues["datetime"];
        number: InputValues["number"];
        phone: InputValues["phone"];
        select: InputValues["select"];
        selectMultiple: InputValues["selectMultiple"];
        stars: InputValues["stars"];
        textArea: InputValues["textArea"];
        time: InputValues["time"];
        toggle: InputValues["toggle"];
        labels: InputValues["labels"];
      }>
        title="Form Example"
        fields={fields}
        onSubmit={(values, resolve, reject) => {
          //do something with those values
          const message = `Form submitted. Hello, ${values.text}`;
          resolve(message);
        }}
        defaultValues={{
          text: name || "",
        }}
      />
    </Div>
  );
};

Page.options = {};

export default Page;
