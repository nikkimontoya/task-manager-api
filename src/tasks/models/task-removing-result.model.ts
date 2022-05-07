import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class TaskRemovingResult {
    @Field((type) => Boolean)
    successful: boolean;
}
