import {Body, Controller, Post, Get, Param, Delete, UseGuards, Put} from '@nestjs/common';
import {TaskDto} from './dto/task.dto';
import {TasksService} from './tasks.service';
import {JwtGuard} from '../auth/guards/jwt.guard';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

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
        return this.taskService.getAll();
    }

    @Get('/:id')
    @UseGuards(JwtGuard)
    async getById(@Param('id') id: string) {
        return this.taskService.getById(+id);
    }

    @Delete('/:id')
    @UseGuards(JwtGuard)
    async deleteById(@Param('id') id: string) {
        return this.taskService.deleteById(+id);
    }
}
