import { IsDefined, IsInt, IsString, Matches, Max, Min, MinLength } from 'class-validator';

export class NewUserDto {
  @IsDefined({ message: "You can't add a user without a login" })
  @IsString({ message: 'Login must be a string' })
  login: string;

  @IsDefined({ message: "You can't add a user without a password" })
  @IsString({ message: 'Password must be a string and contains letters and numbers' })
  @Matches(/(?=.*\d)(?=.*[a-z])/i, { message: 'Password must contain letters and numbers' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  password: string;

  @IsDefined({ message: "You can't add a user without specifying the age" })
  @IsInt({ message: "User's age must be a digit" })
  @Min(4, { message: "User can't be younger than 4 years old" })
  @Max(130, { message: "User can't be older than 130 years old" })
  age: number;
}
