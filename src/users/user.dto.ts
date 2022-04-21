import { InputType, Field } from '@nestjs/graphql'
import {
  IsEthereumAddress,
  IsOptional,
  IsString,
  Matches
} from 'class-validator'

@InputType('LoginUserDto')
export class LoginUserDto {
  @Matches(/^[0-9]{4}$/)
  @Field()
  schoolId: string

  @IsEthereumAddress()
  @Field()
  publicAddress: string
}

@InputType('UpdateUserDto')
export class UpdateUserDto {
  @Matches(/^[a-zA-Z0-9]\w+$/)
  @Field((type) => String)
  username: string

  @IsEthereumAddress()
  @Field()
  publicAddress: string
}
