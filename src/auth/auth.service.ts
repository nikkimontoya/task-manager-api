import {BadRequestException, Injectable} from '@nestjs/common';
import {AuthDto} from './dto/auth.dto';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {genSalt, hash, compare} from 'bcryptjs';
import {JwtService} from '@nestjs/jwt';
import {LoginResponseDto} from './dto/login-response.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async createUser(dto: AuthDto): Promise<User> {
        const salt = await genSalt(10);
        const newUser = this.userRepository.create({
            username: dto.username,
            passwordHash: await hash(dto.password, salt)
        });

        return this.userRepository.save(newUser);
    }

    async findUser(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({username});
    }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.findUser(username);

        // If there is no such a user
        if (!user) {
            throw new BadRequestException('Wrong credentials');
        }

        const isCorrectPassword = await compare(password, user.passwordHash);
        if (!isCorrectPassword) {
            throw new BadRequestException('Wrong credentials');
        }

        return user;
    }

    async login(username: string): Promise<LoginResponseDto> {
        const payload = {username};

        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }
}
