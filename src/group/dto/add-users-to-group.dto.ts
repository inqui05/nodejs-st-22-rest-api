import { ArrayMinSize, IsArray, IsDefined, IsUUID } from "class-validator";

export class AddUsersToGroupDto {
  @IsArray({ message: 'It must be an array of user\'s ids' })
  @ArrayMinSize(1)
  @IsUUID("4", {each: true})
  @IsDefined()
  users: string[];
}
