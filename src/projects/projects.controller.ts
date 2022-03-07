import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {Project} from './entities/project.entity';
import {ProjectsService} from './projects.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {JwtGuard} from '../auth/guards/jwt.guard';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    @UseGuards(JwtGuard)
    async create(@Body() project: CreateProjectDto): Promise<Project | void> {
        return this.projectsService.create(project);
    }

    @Get()
    async getAll(): Promise<Project[]> {
        return this.projectsService.getAll();
    }
}
