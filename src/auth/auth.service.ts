import {Injectable} from '@nestjs/common';
import {AuthDto} from './dto/auth.dto';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {genSaltSync, hashSync} from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(dto: AuthDto): Promise<User> {
        const salt = genSaltSync(10);
        const newUser = this.userRepository.create({
            username: dto.username,
            passwordHash: hashSync(dto.password, salt),
        });

        return this.userRepository.save(newUser);
    }

    async findUser(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({username});
    }
}
