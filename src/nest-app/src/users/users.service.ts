import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      return await this.databaseService.user.create({ data: createUserDto });
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.user.findMany();
    } catch (error) {
      throw new Error(`Failed to find users: ${error}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseService.user.findUnique({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to find user: ${error}`);
    }
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    try {
      return await this.databaseService.user.update({
        data: updateUserDto,
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to update user: ${error}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.user.delete({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to delete user: ${error}`);
    }
  }
}
