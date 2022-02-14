import { DefaultModelType } from "sensible-core";

export const userRoles = ["admin", "club", "team", "student"] as const;
export type UserRole = typeof userRoles[number];

export const publicUserFields = [
  //default ones
  "id",
  "createdAt",
  "updatedAt",

  "name",
  "username",
  "role",
  "image",
  "thumbnail",
  "base64",
  "slug",
  "tagline",
  "skills",
  "language",
  "notes",
  "birthdayDate",
  "birthdayMonth",
  "rate",
  "totalHoursAvailable",
  "twitter",
  "facebook",
  "linkedin",
  "website",
  "location",
  "city",
  "country",
  "onlyRemote",
];

export interface PublicUserType extends DefaultModelType {
  name: string;
  username: string;
  role: UserRole;

  //image
  image: string;
  thumbnail: string;
  base64: string;

  //personal info
  slug: string;
  tagline: string;
  skills: string;
  language: string;
  notes: string;
  birthdayDate: number;
  birthdayMonth: number;

  //hiring
  rate: number;
  totalHoursAvailable: number;

  //socials
  twitter: string;
  facebook: string;
  linkedin: string;
  website: string;

  //location stuff
  location: string;
  country: string;
  city: string;
  onlyRemote: boolean;
}

export const emailJobs = ["every", "weekly", "never"] as const;
export type EmailJobs = typeof emailJobs[number];
export interface MeUserType extends PublicUserType {
  loginToken: string;
  email: string;
  subscribedToNewsletter: boolean;
  emailJobs: EmailJobs;
  dontEmailJobsUntil: number;
  verified: boolean;
  accepted: boolean;
}

export const meUserFields = publicUserFields.concat([
  "email",
  "subscribedToNewsletter",
  "emailJobs",
  "dontEmailJobsUntil",
  "verified",
  "accepted",
]);

export const signupSource = ["landing", "newsletter", "book"] as const;
export type SignupSource = typeof signupSource[number];

export interface UserType extends MeUserType {
  onlineAt: number;
  password: string;
  code: string;
  resetPasswordHash: string | null;
  /**
   * where this user came from (where he signed up)
   */
  source: SignupSource;
  wakaTimeAccessToken: string;
  wakaTimeRefreshToken: string;
  wakaTimeExpiresAt: string;
  wakaTimeUid: string;
}
