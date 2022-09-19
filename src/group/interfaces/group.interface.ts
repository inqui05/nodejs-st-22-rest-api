import { User } from "../../user/models/user.model";
import { Permission } from "./permission.type";

export interface IGroup {
  id: string;
  name: string;
  permissions: Array<Permission>;
  users: User[],
}
