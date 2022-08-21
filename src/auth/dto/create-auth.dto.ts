import { IsDefined, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsDefined({ message: "You can't add a user without a login" })
  @IsString({ message: 'Login must be a string' })
  @IsNotEmpty()
  login: string;

  @IsDefined({ message: "You can't add a user without a password" })
  @IsString({ message: 'Password must be a string and contains letters and numbers' })
  @Matches(/(?=.*\d)(?=.*[a-z])/i, { message: 'Password must contain letters and numbers' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  password: string;
}
