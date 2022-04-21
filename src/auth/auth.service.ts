import { Injectable } from '@nestjs/common'
import { magic } from 'src/magic'
import { UsersService } from 'src/users/users.service'
import { LoginAuthDto, UpdateAuthDto } from './auth.dto'
import { AuthenticatedUser } from './auth.entity'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async login(
    payload: LoginAuthDto,
    publicAddress: string
  ): Promise<AuthenticatedUser> {
    const user = await this.usersService.login({
      ...payload,
      publicAddress
    })

    return {
      jwt: 'string',
      user
    }
  }

  public async updateUser(
    payload: UpdateAuthDto,
    publicAddress: string
  ): Promise<AuthenticatedUser> {
    const user = await this.usersService.updateUser({
      ...payload,
      publicAddress
    })

    return {
      jwt: 'string',
      user
    }
  }
}
