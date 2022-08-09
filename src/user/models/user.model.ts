import { v4 as uuidv4 } from 'uuid';
import { BelongsToMany, Column, DataType, Model,  Table } from "sequelize-typescript";
import { UserCreatingFields } from "../interfaces/user-creating-field.interface";
import { Group } from 'src/group/models/group.model';
import { UserGroup } from 'src/user-group/models/user-group.model';

@Table
export class User extends Model<User, UserCreatingFields> {
  @Column({ type: DataType.STRING, unique: true, primaryKey: true, defaultValue: uuidv4 })
  id: string;

  @Column({ type: DataType.STRING, unique: true })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  age: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  isDeleted: boolean;

  @BelongsToMany(() => Group, () => UserGroup)
  groups: Group[];
}
