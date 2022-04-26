import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {Project} from './entities/project.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateProjectDto} from './dto/create-project.dto';
import {UserService} from '../user/user.service';
import {FindConditions} from 'typeorm/find-options/FindConditions';
import {Task} from '../tasks/entities/task.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
        private readonly userService: UserService,
        private readonly connection: Connection
    ) {}

    async create(projectDto: CreateProjectDto): Promise<Project | void> {
        const users = await this.userService.getByIds([projectDto.administrator, ...projectDto.participants]);

        // If the user with administrator id has not been found, throw an exception
        const administrator = users.find((user) => user.id === projectDto.administrator);
        if (!administrator) {
            throw new NotFoundException(`User with id ${projectDto.administrator} not found`);
        }

        // If there is a non-existent user in participants, throw an exception
        projectDto.participants.forEach((participant: number) => {
            if (!users.find((user) => user.id === participant)) {
                throw new NotFoundException(`User with id ${participant} not found`);
            }
        });

        // Administrator goes in both administrator and users fields
        const newProject = await this.projectRepository.create({
            name: projectDto.name,
            administrator,
            users
        });

        return this.projectRepository.save(newProject);
    }

    async getAll(params?: FindConditions<Project>): Promise<Project[]> {
        return this.projectRepository.find({...params, relations: ['users', 'tasks']});
    }

    async getById(id: number): Promise<Project | undefined> {
        return this.projectRepository.findOne({id}, {relations: ['users', 'tasks']});
    }

    async getByIds(ids: number[]): Promise<Project[]> {
        return this.projectRepository.findByIds(ids, {relations: ['users', 'tasks']});
    }
}
