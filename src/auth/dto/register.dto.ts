import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer'; 
import { Match } from 'src/common/decorators/match.decorator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Type(() => String)
  name: string;

  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email is required' })
  @Type(() => String)
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password terlalu pendek' })
  @Type(() => String) 
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Confirm password is required' })
  @Match('password', { message: 'Password dan Konfirmasi Password tidak cocok' })
  confirmPassword: string;
}