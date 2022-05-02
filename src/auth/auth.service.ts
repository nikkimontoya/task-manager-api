import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';
import {Login} from './models/login.model';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

    async login(email: string, password: string): Promise<Login> {
        const user = await this.userService.validateUser(email, password);
        const payload = {email: user.email};

        return {
            ...user,
            accessToken: await this.jwtService.signAsync(payload)
        };
    }
}
