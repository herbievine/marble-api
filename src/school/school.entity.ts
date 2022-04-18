import 'reflect-metadata'
import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'
import { User } from 'src/users/user.entity'

@ObjectType('SchoolEntity')
export class School {
  @Field()
  id: number

  @Field()
  emailPolicy: string

  @Field((type) => [User], { nullable: true })
  users?: User[]

  @Field((type) => GraphQLISODateTime)
  createdAt: Date

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date
}
