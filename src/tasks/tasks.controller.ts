import {Body, Controller, Post, Get, Param, Delete, UseGuards, Put, NotFoundException, Query} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {TasksService} from './tasks.service';
import {JwtGuard} from '../auth/guards/jwt.guard';
import {UserService} from '../user/user.service';
import {Task} from './entities/task.entity';
import {TaskDto} from './dto/task.dto';
import {TasksDto} from './dto/tasks.dto';
import {UserInterface} from '../user/types/user.interface';
import {TaskFilterInterface} from './types/task-filter.interface';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService, private readonly userService: UserService) {}

    @Post()
    @UseGuards(JwtGuard)
    async create(@Body() body: CreateTaskDto) {
        return this.taskService.create(body);
    }

    @Put('/:id')
    @UseGuards(JwtGuard)
    async edit(@Param('id') id: string, @Body() body: CreateTaskDto) {
        return this.taskService.update(+id, body);
    }

    @Get()
    @UseGuards(JwtGuard)
    // Todo make query validation
    async getAll(@Query() query: TaskFilterInterface): Promise<TasksDto> {
        let tasks;
        if (query.authorId || query.executorId || query.projectId) {
            tasks = await this.taskService.getByFilter(query);
        } else {
            tasks = await this.taskService.getAll();
        }

        const users = await this.getUsersForTasks(tasks);

        return {
            data: tasks,
            included: {
                users
            }
        };
    }

    @Get('/:id')
    @UseGuards(JwtGuard)
    async getById(@Param('id') id: string): Promise<TaskDto> {
        const task = await this.taskService.getById(+id);

        if (!task) {
            throw new NotFoundException();
        }

        const users = await this.getUsersForTasks([task]);

        return {
            data: task,
            included: {
                users
            }
        };
    }

    @Delete('/:id')
    @UseGuards(JwtGuard)
    async deleteById(@Param('id') id: string) {
        return this.taskService.deleteById(+id);
    }

    private async getUsersForTasks(tasks: Task[]): Promise<UserInterface[]> {
        const usersToLoad: Set<number> = tasks.reduce((acc, curr) => {
            acc.add(curr.authorId);
            acc.add(curr.executorId);
            return acc;
        }, new Set<number>());

        return (await this.userService.getByIds(Array.from(usersToLoad), [
            'id',
            'firstName',
            'lastName',
            'email'
        ])) as UserInterface[];
    }
}
