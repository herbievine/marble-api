import 'reflect-metadata'
import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'
import { School } from 'src/school/school.entity'

@ObjectType('UserEntity')
export class User {
  @Field()
  uuid: string

  @Field()
  schoolId: number

  @Field((type) => String, { nullable: true })
  username?: string

  @Field()
  didToken: string

  @Field((type) => School)
  school: School

  @Field((type) => GraphQLISODateTime)
  createdAt: Date

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date
}
