import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field((type) => ID)
    id: number;

    @Field()
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;
}
