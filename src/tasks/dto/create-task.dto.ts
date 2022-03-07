export class CreateTaskDto {
    title: string;
    body: string;
    authorId: number;
    executorId: number;
    deadlineDate: Date;
}
