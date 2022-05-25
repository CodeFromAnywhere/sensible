import { DefaultModelType } from "sensible-core";
import { UserType } from "../User/types";

export interface MessageType extends DefaultModelType {
  userId: number;
  username: string;
  user: UserType;
  message: string;
}
