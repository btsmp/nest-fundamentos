import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdatePatchtUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(UserService.name);

  async create({ email, name, password }: CreateUserDTO) {
    try {
      const user = await this.prisma.user.create({
        data: { email, name, password },
      });
      this.logger.log(`User ${user.id} created successfully.`);
      return user;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }

  async list() {
    this.logger.log(`Listing all users`);
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    this.logger.log(`Showing user with ID ${id}.`);
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    { birthAt, email, name, password, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id);
    return this.prisma.user.update({
      data: {
        email,
        password,
        name,
        birthAt: birthAt ? new Date(birthAt) : null,
        role,
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
