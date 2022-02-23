import {BadRequestException, Body, Controller, Post, UsePipes, ValidationPipe, Res, Get} from '@nestjs/common';
import {Response} from 'express';
import {UserService} from '../user/user.service';
import {User} from './entities/user.entity';
import {AuthDto} from './dto/auth.dto';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(
        @Body() body: AuthDto,
        @Res({passthrough: true}) response: Response
    ): Promise<Omit<User, 'passwordHash'>> {
        const user = await this.userService.findUser(body.username);

        // If a user with such a name already exists
        if (user) {
            throw new BadRequestException('A user with such a name already exists');
        }

        const {username, id} = await this.userService.createUser(body);
        const {accessToken} = await this.authService.login(username);

        response.cookie('authToken', accessToken, {httpOnly: true});

        return {
            id: id,
            username: username
        };
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(
        @Body() body: AuthDto,
        @Res({passthrough: true}) response: Response
    ): Promise<Omit<User, 'passwordHash'> & {accessToken: string}> {
        const user = await this.userService.validateUser(body.username, body.password);
        const {accessToken} = await this.authService.login(user.username);
        response.cookie('authToken', accessToken);

        return {
            id: user.id,
            username: user.username,
            accessToken
        };
    }

    @Get('users')
    async getAll(): Promise<Omit<User, 'passwordHash'>[]> {
        return this.userService.getAll().then((users) =>
            users.map(({id, username}) => ({
                id,
                username
            }))
        );
    }
}
