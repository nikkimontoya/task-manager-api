import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity, OneToMany} from 'typeorm';
import {Project} from '../../projects/entities/project.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToMany(() => Project)
    participatedProjects: Project[];

    @OneToMany(() => Project, (project) => project.administrator)
    administratedProjects: Project[];
}
