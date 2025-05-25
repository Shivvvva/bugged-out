import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'Username is a must!' })
  username: string;

  @IsNotEmpty({ message: 'Name, bro!' })
  name: string;

  @IsEmail({}, { message: 'Valid email, please' })
  email: string;

  @MinLength(6, { message: 'Password gotta be 6+ chars' })
  password: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Valid email, please' })
  email: string;

  @MinLength(6, { message: 'Password gotta be 6+ chars' })
  password: string;
}
