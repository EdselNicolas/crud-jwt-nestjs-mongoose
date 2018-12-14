import { IsString } from 'class-validator';

export class LoginUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;
}
