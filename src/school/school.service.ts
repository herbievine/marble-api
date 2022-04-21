import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { SchoolPolicyDto } from './school.dto'
import { School } from './school.entity'

@Injectable()
export class SchoolService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getSchool(payload: SchoolPolicyDto): Promise<School> {
    const school = await this.prismaService.school.findUnique({
      where: {
        id: +payload.schoolId
      }
    })

    return school
  }
}
