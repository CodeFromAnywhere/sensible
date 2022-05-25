import { Div, P, Span } from "react-with-native";
import { api } from "../api";
import { useEffect, useState } from "react";
import { Form, InputValues, makeField } from "../components/Form";
import useStore from "../store";
import { RWNPage } from "../types";
import { MessageType } from "core";

const fields = [
  makeField("text", {
    field: "message",
    title: "Message",
  }),
];

// Now your form can be rendered like this
// Make sure to provide the generic based on the inputs type interfaces
// otherwise your form won't be typesafe!

const Page: RWNPage = () => {
  const [loginToken] = useStore("loginToken");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const fetchMessages = async () => {
    const { messages } = await api("messages", "GET");
    setMessages(messages);
  };

  const renderMessage = (message: MessageType, index: number) => {
    return (
      <Div key={`message${message.id}`}>
        <P>
          <Span textClassName="font-bold">{message.user?.email}</Span>:{" "}
          {message.message}
        </P>
      </Div>
    );
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Div scroll className="py-4 px-8 lg:px-20">
      {messages.map(renderMessage)}
      <Form<{
        message: InputValues["text"];
      }>
        fields={fields}
        onSubmit={async (values, resolve, reject) => {
          if (!loginToken) {
            return reject("Please login first");
          }

          const response = await api("message", "POST", {
            message: values.message,
            loginToken,
          });

          if (!response.success) {
            return reject(response.response);
          }

          fetchMessages();
          return resolve(response.response);
        }}
      />
    </Div>
  );
};

Page.options = {};

export default Page;
