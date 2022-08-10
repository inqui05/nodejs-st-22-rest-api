import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { permission, Permission } from "../interfaces/permission.type";

export class CreateGroupDto {
  @IsDefined({ message: 'Group must have a name' })
  @IsString({ message: 'Group name must be a string' })
  @IsNotEmpty()
  name: string;

  @IsArray({ message: 'It must be an array of its permissions' })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(permission, {
    each: true,
    message: 'It\'s possible to set only next permissions: READ, WRITE, DELETE, SHARE and UPLOAD_FILES'
  })
  permissions: Array<Permission>;
}
