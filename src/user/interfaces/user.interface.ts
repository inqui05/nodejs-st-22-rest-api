import { Group } from "src/group/models/group.model";

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
  groups: Group[];
}
