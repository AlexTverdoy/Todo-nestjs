import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  readonly username: string;
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  readonly password: string;
}
