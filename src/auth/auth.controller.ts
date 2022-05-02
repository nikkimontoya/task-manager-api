import {BadRequestException, Body, Controller, Post, UsePipes, ValidationPipe, Res, Get} from '@nestjs/common';
import {Response} from 'express';
import {UserService} from '../user/user.service';
import {User} from '../user/entities/user.entity';
import {RegisterDto} from './dto/register.dto';
import {AuthService} from './auth.service';
import {LoginDto} from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    // @UsePipes(new ValidationPipe())
    // @Post('register')
    // async register(
    //     @Body() body: RegisterDto,
    //     @Res({passthrough: true}) response: Response
    // ): Promise<Partial<User> & {accessToken: string}> {
    //     const user = await this.userService.findUser(body.email);
    //
    //     // If a user with such a name already exists
    //     if (user) {
    //         throw new BadRequestException('A user with such a name already exists');
    //     }
    //
    //     const {email, id, firstName, lastName} = await this.userService.createUser(body);
    //     const {accessToken} = await this.authService.login(email);
    //
    //     response.cookie(
    //         'user',
    //         JSON.stringify({
    //             id,
    //             accessToken
    //         }),
    //         {httpOnly: true}
    //     );
    //
    //     return {
    //         id,
    //         email,
    //         firstName,
    //         lastName,
    //         accessToken
    //     };
    // }

    // @UsePipes(new ValidationPipe())
    // @Post('login')
    // async login(
    //     @Body() body: LoginDto,
    //     @Res({passthrough: true}) response: Response
    // ): Promise<Partial<User> & {accessToken: string}> {
    //     const {email, id, firstName, lastName} = await this.userService.validateUser(body.email, body.password);
    //     const {accessToken} = await this.authService.login(email);
    //     response.cookie(
    //         'user',
    //         JSON.stringify({
    //             id,
    //             accessToken
    //         }),
    //         {httpOnly: true}
    //     );
    //
    //     return {
    //         id,
    //         email,
    //         firstName,
    //         lastName,
    //         accessToken
    //     };
    // }

    // @Get('users')
    // async getAll(): Promise<Partial<User>[]> {
    //     return this.userService.getAll(['id', 'firstName', 'lastName', 'email']);
    // }
}
