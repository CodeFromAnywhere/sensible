import { AutoIncrement, Column, Model, PrimaryKey } from "sequelize-typescript";

export class DefaultModel<T, T2> extends Model<T, T2> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  // timestamps!
  @Column
  public readonly createdAt!: Date;
  @Column
  public readonly updatedAt!: Date;
}
