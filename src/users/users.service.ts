import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrLoginUserDto } from './user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createOrLoginUser(payload: CreateOrLoginUserDto): Promise<User> {
    const { user: userService } = this.prismaService

    const { schoolId, ...data } = payload

    let user: User

    try {
      user = await userService.create({
        data: {
          ...data,
          schoolId: +schoolId
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          user = await userService.findUnique({
            where: {
              didToken: payload.didToken
            }
          })
        }
      } else {
        throw new BadRequestException()
      }
    }

    return user
  }
}
