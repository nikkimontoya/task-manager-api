import {BadRequestException, Injectable} from '@nestjs/common';
import {AuthDto} from '../auth/dto/auth.dto';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {genSalt, hash, compare} from 'bcryptjs';
import {UserInterface} from './types/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createUser(dto: AuthDto): Promise<UserInterface> {
        const salt = await genSalt(10);
        const newUser = this.userRepository.create({
            username: dto.username,
            passwordHash: await hash(dto.password, salt)
        });

        const {passwordHash, ...user} = await this.userRepository.save(newUser);
        return user;
    }

    async getAll(): Promise<UserInterface[]> {
        return this.userRepository.find({select: ['id', 'firstName', 'lastName', 'username']});
    }

    async getByIds(ids: number[]): Promise<UserInterface[]> {
        return this.userRepository.findByIds(ids, {select: ['id', 'firstName', 'lastName', 'username']});
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
}
