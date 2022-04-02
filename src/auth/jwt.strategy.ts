import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'
import { Auth } from './auth.types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  public async validate(
    payload: Auth.DecodedJwt
  ): Promise<Auth.CleanUser | null> {
    const user = await this.usersService.getUser(payload.email)

    if (user) {
      const { password, ...rest } = user

      return rest
    }

    return null
  }
}
