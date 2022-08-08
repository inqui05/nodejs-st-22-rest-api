import { Permission } from "./permission.type";

export interface GroupCreatingFields {
  name: string;
  permissions: Array<Permission>;
}
