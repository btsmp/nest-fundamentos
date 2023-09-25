import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePatchtUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDTO) {
    return await this.prisma.user.create({
      data: { email, name, password },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    { birthAt, email, name, password }: UpdatePutUserDTO,
  ) {
    await this.exists(id);
    return this.prisma.user.update({
      data: {
        email,
        password,
        name,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: { id },
    });
  }
  async updatePartial(id: number, data: UpdatePatchtUserDTO) {
    await this.exists(id);
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async delete(id: number) {
    await this.exists(id);
    return this.prisma.user.delete({ where: { id } });
  }

  async exists(id: number) {
    if (!(await this.prisma.user.count({ where: { id } }))) {
      throw new BadRequestException(`User ${id} does not exist`);
    }
  }
}
