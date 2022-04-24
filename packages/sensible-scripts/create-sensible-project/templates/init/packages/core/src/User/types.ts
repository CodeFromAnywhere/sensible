import { createEnum, DefaultModelType } from "sensible-core";

export const publicUserFields = [
  "id",
  "name",
  "username",
  "role",
  "image",
  "base64",
  "createdAt",
  "updatedAt",
];

export const meUserFields = publicUserFields.concat([
  "loginToken",
  "email",
  "subscribedToNewsletter",
]);

export type ProfilePath = string;

export const userRoles = ["default", "admin"] as const;
export type UserRole = typeof userRoles[number];

export interface PublicUserType extends DefaultModelType {
  name: string;
  username: string;
  role: UserRole;
  image: string;
  base64: string;
}

export interface MeUserType extends PublicUserType {
  loginToken: string;
  email: string;
  subscribedToNewsletter: boolean;
}

export const signupSource = ["landing", "app", "newsletter"] as const;
export type SignupSource = typeof signupSource[number];
export const signupSourceEnum = createEnum(signupSource);

export interface UserType extends MeUserType {
  onlineAt: number;
  password: string;
  code: string;
  verified: boolean;
  resetPasswordHash: string | null;
  /**
   * where this user came from (where he signed up)
   */
  source: SignupSource;
}
