import { LoginUserDto } from './../users/login-user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { Controller, Get, UseGuards, Post, Body, Response, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) { }

    @Post('login')
    async login(@Body() payload: JwtPayload) {
        const user = await this.usersService.findOne(payload);
        if (user) {
            if (await this.usersService.compareHash(payload.password, user['password'])) {
                return await this.authService.createToken(payload);
            } else {
                throw new HttpException({
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'Wrong username or password',
                }, HttpStatus.UNAUTHORIZED);
            }
        }
    }

    @Post('token')
    async createToken(@Body() payload: JwtPayload): Promise<any> {
        return await this.authService.createToken(payload);
    }

    @Get('data')
    @UseGuards(AuthGuard())
    findAll() {
        // This route is restricted by AuthGuard
    }
}
