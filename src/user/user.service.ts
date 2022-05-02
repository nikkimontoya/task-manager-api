import {BadRequestException, Injectable} from '@nestjs/common';
import {RegisterDto} from '../auth/dto/register.dto';
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

    async createUser(dto: RegisterDto): Promise<UserInterface> {
        const salt = await genSalt(10);
        const newUser = this.userRepository.create({
            email: dto.email,
            passwordHash: await hash(dto.password, salt),
            firstName: dto.firstName,
            lastName: dto.lastName
        });

        const {passwordHash, ...user} = await this.userRepository.save(newUser);
        return user;
    }

    async getAll(): Promise<Partial<User>[]> {
        return this.userRepository.find();
    }

    async getByIds(ids: number[]): Promise<Partial<User>[]> {
        return this.userRepository.findByIds(ids);
    }

    async getById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({id});
    }

    async findUser(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({email});
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.findUser(email);

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
