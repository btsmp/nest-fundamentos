import { Injectable, NotFoundException } from '@nestjs/common';
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
      select: {
        id: true,
        name: true,
      },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    { birthAt, email, name, password }: UpdatePutUserDTO,
  ) {
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
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async delete(id: number) {
    if (!(await this.show(id))) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
