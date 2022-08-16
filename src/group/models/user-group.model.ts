import { v4 as uuidv4 } from 'uuid';
import { Column, DataType, ForeignKey, Model,  Table } from "sequelize-typescript";
import { User } from 'src/user/models/user.model';
import { Group } from 'src/group/models/group.model';

@Table
export class UserGroup extends Model<UserGroup> {
  @Column({ type: DataType.STRING, unique: true, primaryKey: true, defaultValue: uuidv4 })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING, allowNull: false })
  user_id: string;

  @ForeignKey(() => Group)
  @Column({ type: DataType.STRING, allowNull: false })
  group_id: string;
}
