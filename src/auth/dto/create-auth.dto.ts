import { IsDefined, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsDefined({ message: "You can't add a user without a username" })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty()
  username: string;

  @IsDefined({ message: "You can't add a user without a password" })
  @IsString({ message: 'Password must be a string and contains letters and numbers' })
  @Matches(/(?=.*\d)(?=.*[a-z])/i, { message: 'Password must contain letters and numbers' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  password: string;
}
