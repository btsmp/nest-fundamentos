import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body) {
    return { body };
  }

  @Get()
  async list() {
    return { users: [] };
  }

  @Get(':id')
  async listOne(@Param() params) {
    return { user: {}, params };
  }

  @Put(':id')
  async updatePartial(@Body() body, @Param() params) {
    return {
      method: 'put',
      body,
      params,
    };
  }

  @Delete(':id')
  async delete(@Param() params) {
    return { method: 'delete', params };
  }
}
