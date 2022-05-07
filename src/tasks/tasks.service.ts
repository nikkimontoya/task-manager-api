import {BadRequestException, Injectable} from '@nestjs/common';
import {DeleteResult, FindManyOptions, Repository} from 'typeorm';
import {Task} from './entities/task.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateTaskDto} from './dto/create-task.dto';
import {FindConditions} from 'typeorm/find-options/FindConditions';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

    async create(task: CreateTaskDto): Promise<Task> {
        const newTask = this.taskRepository.create(task);
        return this.taskRepository.save(newTask);
    }

    async update(id: number, task: CreateTaskDto): Promise<Task> {
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

    async getByIds(ids: number[]): Promise<Task[]> {
        return this.taskRepository.findByIds(ids);
    }

    async getByFilter(filter: FindConditions<Task>): Promise<Task[]> {
        return this.taskRepository.find(filter);
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return this.taskRepository.delete(id);
    }
}
