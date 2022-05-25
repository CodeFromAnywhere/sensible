import { DefaultModelType } from "sensible-core";

export const publicUserFields = [
  "id",
  "name",
  "username",
  "image",
  "createdAt",
  "updatedAt",
  "email",
];

export const meUserFields = publicUserFields.concat(["loginToken", "email"]);

export type ProfilePath = string;

export interface PublicUserType extends DefaultModelType {
  name: string;
  username: string;
  image: string;
  email: string;
}

export interface MeUserType extends PublicUserType {
  loginToken: string;
  email: string;
}

export interface UserType extends MeUserType {
  onlineAt: number;
  password: string;
  code: string;
  verified: boolean;
}
