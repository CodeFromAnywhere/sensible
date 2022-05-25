import { Table, Column, BelongsTo, ForeignKey } from "sequelize-typescript";
import { DefaultModel } from "sensible-server";
import { MessageType } from "core";
import User from "../User/model";

interface MessageCreationType extends Partial<MessageType> {}

@Table
export class Message
  extends DefaultModel<MessageType, MessageCreationType>
  implements MessageType
{
  @Column
  public message!: string;
  @Column
  public username!: string;

  @ForeignKey(() => User)
  @Column
  public userId!: number;

  @BelongsTo(() => User)
  public user!: User;
}

export default Message;
