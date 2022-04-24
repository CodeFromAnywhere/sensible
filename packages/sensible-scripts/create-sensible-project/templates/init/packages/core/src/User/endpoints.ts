import { DefaultResponse, Endpoint } from "sensible-core";
import {
  MeUserType,
  PublicUserType,
  SignupSource,
  UserRole,
  UserType,
} from "./types";

export interface LoginEndpoint extends Endpoint {
  method: "POST";
  body: { email: string; password: string };
  response: DefaultResponse & { loginToken?: string; me?: MeUserType };
}

export interface UsersEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: { users: PublicUserType[]; success: boolean };
}

export interface SignupEndpoint extends Endpoint {
  method: "POST";
  body: {
    email: string;
    source: SignupSource;
    username?: string;
    password?: string;
    name?: string;
    image?: string;
    base64?: string;
    subscribeToNewsletter?: boolean;
  };
  response: DefaultResponse;
}

export interface SignupWithEmail extends Endpoint {
  method: "POST";
  body: {
    email: string;
    password: string;
    loginToken: string;
  };
  response: { me?: Partial<UserType> } & DefaultResponse;
}

export interface ActivateEndpoint extends Endpoint {
  method: "POST";
  body: { code: string; email?: string };
  response: DefaultResponse & { loginToken?: string };
}

export interface MeEndpoint extends Endpoint {
  method: "GET";
  body: { loginToken: string };
  response: {
    me?: MeUserType;
    loginToken?: string;
  } & DefaultResponse;
}

export interface UpdatePasswordEndpoint extends Endpoint {
  method: "POST";
  body: {
    current: string;
    password1: string;
    password2: string;
    loginToken: string;
  };
  response: DefaultResponse;
}

export interface UpdateUserEndpoint extends Endpoint {
  method: "POST";
  body: {
    loginToken: string;
    code: string;
    name: string;
    image: string;
    base64: string;
    role: UserRole;
  };
  response: DefaultResponse;
}

export interface UserEndpoint extends Endpoint {
  method: "GET";
  body: { slug: string };
  response: {
    user?: PublicUserType | null;
  };
}

export interface LoginVerifyEndpoint extends Endpoint {
  method: "POST";
  body: { phone: string; email: string; code: string };
  response: {
    loginToken?: string;
  } & DefaultResponse;
}

export interface ForgotPasswordEndpoint extends Endpoint {
  method: "POST";
  body: { email: string };
  response: DefaultResponse;
}

export interface ResetPasswordEndpoint extends Endpoint {
  method: "GET";
  body: { email: string; hash: string; password1: string; password2: string };
  response: DefaultResponse;
}

export interface UserEndpoints {
  login: LoginEndpoint;
  signup: SignupEndpoint;
  users: UsersEndpoint;
  activate: ActivateEndpoint;
  me: MeEndpoint;
  updatePassword: UpdatePasswordEndpoint;
  updateUser: UpdateUserEndpoint;
  user: UserEndpoint;
  loginVerify: LoginVerifyEndpoint;
  forgotPassword: ForgotPasswordEndpoint;
  resetPassword: ResetPasswordEndpoint;
  signupWithEmail: SignupWithEmail;
}
