import { DefaultResponse, Endpoint } from "sensible-core";

export interface RequestAccessEndpoint extends Endpoint {
  method: "POST";
  body: {
    email: string;
  };
  response: DefaultResponse;
}

export interface UserEndpoints {
  requestAccess: RequestAccessEndpoint;
}
