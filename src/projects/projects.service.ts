import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {Project as ProjectModel} from './models/project.model';
import {Project as ProjectEntity} from './entities/project.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateProjectDto} from './dto/create-project.dto';
import {UserService} from '../user/user.service';
import {FindConditions} from 'typeorm/find-options/FindConditions';
import {EditProjectInput} from './models/edit-project.input';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>,
        private readonly userService: UserService
    ) {}

    async create(projectDto: CreateProjectDto): Promise<ProjectEntity> {
        const administrator = await this.userService.getById(parseInt(projectDto.administrator, 10));

        // If the user with administrator id has not been found, throw an exception
        if (!administrator) {
            throw new NotFoundException(`User with id ${projectDto.administrator} not found`);
        }

        // Administrator goes in both administrator and users fields
        const newProject = await this.projectRepository.create({
            name: projectDto.name,
            description: projectDto.description,
            administrator,
            users: [administrator]
        });

        return this.projectRepository.save(newProject);
    }

    async getAll(params?: FindConditions<ProjectEntity>): Promise<ProjectEntity[]> {
        return this.projectRepository.find({...params});
    }

    async getById(id: number): Promise<ProjectEntity | undefined> {
        return this.projectRepository.findOne({id});
    }

    async getByIds(ids: number[]): Promise<ProjectEntity[]> {
        return this.projectRepository.findByIds(ids);
    }

    async update(id: number, project: EditProjectInput): Promise<ProjectEntity> {
        const updatedProject = await this.projectRepository.preload({id, ...project});

        if (!updatedProject) {
            throw new BadRequestException(`Project with id ${id} is not found`);
        }

        return this.projectRepository.save(updatedProject);
    }
}
