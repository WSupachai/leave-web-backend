import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: any) {
    // 1. เข้ารหัสรหัสผ่านก่อนบันทึก
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // 2. แทนที่รหัสผ่านเดิมด้วยรหัสที่เข้ารหัสแล้ว
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async findOne(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  
  async findAll() {
    return this.userModel.find().exec();
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