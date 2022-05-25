import { DefaultResponse, Endpoint } from "sensible-core";
import { MessageType } from "./types";

export interface MessageEndpoint extends Endpoint {
  method: "POST";
  body: {
    loginToken: string;
    message: string;
  };
  response: DefaultResponse;
}

export interface MessagesEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: {
    success: boolean;
    messages: MessageType[];
  };
}

export interface MessageEndpoints {
  message: MessageEndpoint;
  messages: MessagesEndpoint;
}
