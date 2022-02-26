import {Body, Controller, Post, Get, Param, Delete, UseGuards, Put, NotFoundException} from '@nestjs/common';
import {TaskDto} from './dto/task.dto';
import {TasksService} from './tasks.service';
import {JwtGuard} from '../auth/guards/jwt.guard';
import {UserService} from '../user/user.service';
import {Task} from './entities/task.entity';
import {User} from '../auth/entities/user.entity';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService, private readonly userService: UserService) {}

    @Post()
    @UseGuards(JwtGuard)
    async create(@Body() body: TaskDto) {
        return this.taskService.create(body);
    }

    @Put('/:id')
    @UseGuards(JwtGuard)
    async edit(@Param('id') id: string, @Body() body: TaskDto) {
        return this.taskService.update(+id, body);
    }

    @Get()
    @UseGuards(JwtGuard)
    async getAll() {
        const tasks = await this.taskService.getAll();
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
    async getById(@Param('id') id: string) {
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

    private async getUsersForTasks(tasks: Task[]): Promise<Omit<User, 'passwordHash'>[]> {
        const usersToLoad: Set<number> = tasks.reduce((acc, curr) => {
            acc.add(curr.authorId);
            acc.add(curr.executorId);
            return acc;
        }, new Set<number>());

        const users = await this.userService.getByIds(Array.from(usersToLoad));
        return users.map(({id, username}) => ({id, username}));
    }
}
