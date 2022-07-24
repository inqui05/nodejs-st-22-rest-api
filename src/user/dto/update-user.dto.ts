import { IsDefined, IsInt, IsString, Matches, Max, Min, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsDefined({ message: "You can't update the user if you don't specify a login" })
  @IsString({ message: 'Login must be a string' })
  @MinLength(3, { message: 'Login must contain at least 3 characters' })
  login: string;

  @IsDefined({ message: "You can't update a user if you don't specify a password" })
  @IsString({ message: 'Password must be a string and contains letters and numbers' })
  @Matches(/(?=.*\d)(?=.*[a-z])/i, { message: 'Password must contain letters and numbers' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  password: string;

  @IsDefined({ message: "You can't update a user if you don't specify the age" })
  @IsInt({ message: "User's age must be a digit" })
  @Min(4, { message: "User can't be younger than 4 years old" })
  @Max(130, { message: "User can't be older than 130 years old" })
  age: number;
}
