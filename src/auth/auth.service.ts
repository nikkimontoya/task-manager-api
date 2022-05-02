import {BadRequestException, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';
import {Login} from './models/login.model';
import {RegisterDto} from './dto/register.dto';
import {UserInterface} from '../user/types/user.interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

    async login(user: UserInterface): Promise<Login> {
        const payload = {email: user.email};

        return {
            ...user,
            accessToken: await this.jwtService.signAsync(payload)
        };
    }

    async register(data: RegisterDto) {
        if (await this.userService.findUser(data.email)) {
            throw new BadRequestException('A user with such a name already exists');
        }

        const user = await this.userService.createUser(data);
        return this.login(user);
    }
}
