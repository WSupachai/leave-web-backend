import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leave } from './schemas/leave.schema';

@Injectable()
export class LeavesService {
  // 1. เรียกใช้ Database ผ่าน Constructor
  constructor(@InjectModel(Leave.name) private leaveModel: Model<Leave>) {}

  // 2. ฟังก์ชันสร้างใบลา
  async create(createLeaveDto: any) {
    const newLeave = new this.leaveModel(createLeaveDto);
    return newLeave.save(); // สั่งบันทึกลง MongoDB จริงๆ!
  }

  // 3. ฟังก์ชันดึงข้อมูลทั้งหมด
 async findAll() {
  // ดึงมาตรงๆ เลย ไม่ต้องไปเชื่อมกับใครแล้ว
  return this.leaveModel.find().exec();
}

}