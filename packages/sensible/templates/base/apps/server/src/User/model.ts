import { DataTypes } from "sequelize";
import { Table, Column, Index } from "sequelize-typescript";
import { DefaultModel } from "sensible-server";
import {
  SignupSource,
  signupSource,
  UserRole,
  userRoles,
  UserType,
} from "core";

interface UserCreationType extends Partial<UserType> {}

@Table
export class User
  extends DefaultModel<UserType, UserCreationType>
  implements UserType
{
  @Index({ unique: true })
  @Column
  public loginToken!: string;

  @Column({ type: DataTypes.BIGINT, defaultValue: 0 })
  public onlineAt!: number;

  @Column
  public username!: string;

  @Column
  public password!: string;

  @Column
  public name!: string;

  @Column
  public email!: string;

  @Column
  public phone!: string;

  @Column
  public code!: string;

  @Column
  public image!: string;

  @Column
  public subscribedToNewsletter!: boolean;

  @Column({ type: DataTypes.STRING(1024) })
  public base64!: string;

  @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
  public verified!: boolean;

  @Column({
    type: DataTypes.ENUM(...signupSource),
    defaultValue: signupSource[0],
  })
  public source!: SignupSource;

  @Column({ type: DataTypes.ENUM(...userRoles), defaultValue: userRoles[0] })
  public role!: UserRole;

  @Column
  public resetPasswordHash!: string;
}

export default User;
