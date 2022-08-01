import { v4 as uuidv1 } from 'uuid';
import { Column, DataType, Model,  Table } from "sequelize-typescript";
import { UserCreatingFields } from "../interfaces/user-creating-field.interface";

@Table
export class User extends Model<User, UserCreatingFields> {
  @Column({ type: DataType.STRING, unique: true, primaryKey: true, defaultValue: uuidv1 })
  id: string;

  @Column({ type: DataType.STRING, unique: true })
  login: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.INTEGER })
  age: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean;
}