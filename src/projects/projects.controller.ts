import {Body, Controller, Get, NotFoundException, Param, Post, Query, UseGuards} from '@nestjs/common';
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
    // TODO add query validation
    async getAll(@Query() query: {administratorId: number}): Promise<Project[]> {
        return this.projectsService.getAll(query);
    }

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<Project> {
        const project = await this.projectsService.getById(id);

        if (!project) {
            throw new NotFoundException(`No project with id ${id}`);
        }

        return project;
    }
}
