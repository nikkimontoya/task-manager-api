import {BadRequestException, Injectable} from '@nestjs/common';
import {DeleteResult, Repository} from 'typeorm';
import {Task} from './entities/task.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {TaskDto} from './dto/task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

    async create(task: TaskDto): Promise<Task> {
        const now = new Date();
        const newTask = this.taskRepository.create({
            ...task,
            createdAt: now,
            updatedAt: now
        });

        return this.taskRepository.save(newTask);
    }

    async update(id: number, task: TaskDto): Promise<Task> {
        const updatedTask = await this.taskRepository.preload({id, ...task});

        if (!updatedTask) {
            throw new BadRequestException(`Task with id ${id} is not found`);
        }

        return this.taskRepository.save(updatedTask);
    }

    async getAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async getById(id: number): Promise<Task | undefined> {
        return this.taskRepository.findOne({id});
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return this.taskRepository.delete(id);
    }
}
