import { DefaultResponse, Endpoint } from "sensible-core";
import { PublicUserType } from "./types";

export interface SignupEndpoint extends Endpoint {
  method: "POST";
  body: {
    email: string;
    subscribeToNewsletter?: boolean;
  };
  response: DefaultResponse;
}

export interface LoginEndpoint extends Endpoint {
  method: "POST";
  body: {
    email: string;
    password: string;
  };
  response: DefaultResponse & { loginToken?: string };
}

export interface UsersEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: {
    success: boolean;
    users: PublicUserType[];
  };
}

export interface UserEndpoints {
  signup: SignupEndpoint;
  login: LoginEndpoint;
  users: UsersEndpoint;
}
