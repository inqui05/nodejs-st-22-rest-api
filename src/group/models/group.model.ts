import { v4 as uuidv4 } from 'uuid';
import { BelongsToMany, Column, DataType, Model,  Table } from "sequelize-typescript";
import { GroupCreatingFields } from "../interfaces/group-creating-field.interface";
import { Permission } from '../interfaces/permission.type';
import { User } from 'src/user/models/user.model';
import { UserGroup } from 'src/user-group/models/user-group.model';

@Table
export class Group extends Model<Group, GroupCreatingFields> {
  @Column({ type: DataType.STRING, unique: true, primaryKey: true, defaultValue: uuidv4 })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  permissions: Permission[];

  @BelongsToMany(() => User, () => UserGroup)
  users: User[];
}
