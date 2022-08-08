import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsNotEmpty, IsString } from "class-validator";
import { Permission } from "../interfaces/permission.type";

export class CreateGroupDto {
  @IsDefined({ message: 'Group must have a name' })
  @IsString({ message: 'Group name must be a string' })
  @IsNotEmpty()
  name: string;

  @IsArray({ message: 'It must be an array of its permissions' })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  permissions: Array<Permission>;
}
