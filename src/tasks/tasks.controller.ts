import {Body, Controller, Post, Get, Param, Delete} from '@nestjs/common';
import {TaskDto} from './dto/task.dto';
import {TasksService} from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Post()
    async create(@Body() body: TaskDto) {
        return this.taskService.create(body);
    }

    @Get()
    async getAll() {
        return this.taskService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return this.taskService.getById(id);
    }

    @Delete('/:id')
    async deleteById(@Param('id') id: number) {
        return this.taskService.deleteById(id);
    }
}
