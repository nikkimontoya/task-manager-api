import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Task} from '../../tasks/entities/task.entity';
import {User} from '../../user/entities/user.entity';
import {JoinTable} from 'typeorm';

@Entity()
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];

    @ManyToMany(() => User)
    @JoinTable({
        name: 'projects_users',
        joinColumn: {
            name: 'projectId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        }
    })
    users: User[];

    @ManyToOne(() => User, (user) => user.administratedProjects)
    @JoinColumn({name: 'administratorId'})
    administrator: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
