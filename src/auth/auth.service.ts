import { Injectable } from '@nestjs/common'
import { magic } from 'src/magic'
import { UsersService } from 'src/users/users.service'
import { LoginAuthDto } from './auth.dto'
import { AuthenticatedUser } from './auth.entity'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async login(
    payload: LoginAuthDto,
    didToken: string
  ): Promise<AuthenticatedUser> {
    const user = await this.usersService.login({
      ...payload,
      didToken
    })

    return {
      jwt: 'string',
      user
    }
  }
}
