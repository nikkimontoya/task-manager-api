import {Injectable} from '@nestjs/common';
import {LoginResponseDto} from './dto/login-response.dto';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async login(username: string): Promise<LoginResponseDto> {
        const payload = {username};

        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }
}
