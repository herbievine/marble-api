import 'reflect-metadata'
import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType('UserEntity')
export class User {
  @Field()
  schoolId: number

  @Field((type) => String, { nullable: true })
  username?: string

  @Field()
  didToken: string

  @Field((type) => GraphQLISODateTime)
  createdAt: Date

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date
}
