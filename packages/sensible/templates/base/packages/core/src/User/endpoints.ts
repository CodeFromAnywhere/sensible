import { DefaultResponse, Endpoint } from "sensible-core";

export interface SignupEndpoint extends Endpoint {
  method: "POST";
  body: {
    email: string;
    subscribeToNewsletter?: boolean;
  };
  response: DefaultResponse;
}

export interface UserEndpoints {
  signup: SignupEndpoint;
}
