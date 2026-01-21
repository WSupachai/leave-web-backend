import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

import { AuthGuard } from '@nestjs/passport'; // ✅ ใช้ Guard
import { CreateUserDto } from './dto/create-user.dto'; // (ถ้าคุณมี DTO)

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt')) // ✅ ต้องมี Token ถึงเข้าได้
  @Post()
  create(@Body() createUserDto: any, @Request() req) { // ใช้ any ไปก่อนถ้าขี้เกียจแก้ DTO
    // 👮‍♂️ เช็คสิทธิ์: ถ้าไม่ใช่ Admin ห้ามสร้าง User!
    if (req.user.role !== 'admin') {
        throw new UnauthorizedException('เฉพาะ Admin เท่านั้นที่สร้าง User ได้');
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
