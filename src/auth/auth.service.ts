import { Injectable } from '@nestjs/common'
import { magic } from 'src/magic'
import { UsersService } from 'src/users/users.service'
import { CreateOrUpdateUserDto } from './auth.dto'
import { AuthenticatedUser } from './auth.entity'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async login(
    payload: CreateOrUpdateUserDto,
    didToken: string
  ): Promise<AuthenticatedUser> {
    console.log(magic().secretApiKey)

    const s = magic().token.validate(didToken)

    console.log(s)

    const user = await this.usersService.createOrLoginUser({
      ...payload,
      didToken
    })

    return {
      jwt: 'string',
      user
    }
  }
}
