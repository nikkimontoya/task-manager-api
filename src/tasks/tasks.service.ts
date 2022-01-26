import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Task} from './entities/task.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {TaskDto} from './dto/task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

    async create(task: TaskDto): Promise<Task> {
        const newTask = this.taskRepository.create(task);
        return this.taskRepository.save(newTask);
    }

    async getAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async getById(id: number): Promise<Task | undefined> {
        return this.taskRepository.findOne({id});
    }
}
