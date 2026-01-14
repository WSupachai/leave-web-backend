import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: any) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }
  
  // เพิ่มฟังก์ชันหา User ตาม ID (จะได้ใช้ตอนเช็คว่าเป็นหัวหน้าใคร)
  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  // แก้ไขข้อมูล (รับ id เป็น string)
  async update(id: string, updateUserDto: any) {
    // { new: true } แปลว่าให้คืนค่าข้อมูลใหม่กลับมาหลังแก้เสร็จ
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  // ลบข้อมูล (รับ id เป็น string)
  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}