import { Permission } from "./permission.type";

export interface IGroup {
  id: string;
  name: string;
  permissions: Array<Permission>;
}
