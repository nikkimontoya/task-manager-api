export interface TaskInterface {
    id: number;
    title: string;
    body: string;
    authorId: number;
    executorId: number;
    projectId: number;
    deadlineDate: Date;
}
