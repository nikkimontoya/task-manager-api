import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {User} from '../../user/entities/user.entity';
import {Project} from '../../projects/entities/project.entity';
import {JoinColumn} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @ManyToOne(() => User)
    author: User;

    @Column()
    authorId: number;

    @ManyToOne(() => User)
    executor: User;

    @Column()
    executorId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({nullable: true})
    deadlineDate: Date;

    @ManyToOne(() => Project, (project) => project.tasks)
    @JoinColumn({
        name: 'projectId'
    })
    project: Project;

    @Column()
    projectId: number;
}
