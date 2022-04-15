import 'reflect-metadata'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/user.entity'

@ObjectType('AuthenticatedUser')
export class AuthenticatedUser {
  @Field()
  user: User

  @Field()
  jwt: string
}
