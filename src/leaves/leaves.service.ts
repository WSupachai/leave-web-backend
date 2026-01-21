import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leave } from './schemas/leave.schema';
import { stringify } from 'querystring';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class LeavesService {
  // 1. เรียกใช้ Database ผ่าน Constructor
  constructor(@InjectModel(Leave.name) private leaveModel: Model<Leave>) { }

  // 2. ฟังก์ชันสร้างใบลา
  async create(createLeaveDto: any) {
    const newLeave = new this.leaveModel(createLeaveDto);
    return newLeave.save(); // สั่งบันทึกลง MongoDB จริงๆ!
  }

  // 👇 แก้ตรงนี้ครับ! ใส่ (user: any) เข้าไปในวงเล็บ
  async findAll(user: any): Promise<Leave[]> { 
    
    // 👑 1. Admin: ใหญ่สุด เห็นของทุกคน ทุกแผนก
    if (user.role === 'admin') {
      return this.leaveModel.find().sort({ createdAt: -1 }).exec();
    }

    // 👔 2. Manager: เห็นเฉพาะใบลาที่ "แผนกตรงกับตัวเอง"
    if (user.role === 'manager') {
      return this.leaveModel.find({ 
        department: user.department // ✅ กรองตรงนี้ครับ
      }).sort({ createdAt: -1 }).exec();
    }

    // 👷‍♂️ 3. Employee (พนักงานทั่วไป): เห็นแค่ "ของตัวเอง"
    return this.leaveModel.find({ 
      userName: user.fullName 
    }).sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: string) {
    return this.leaveModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  }

  // แก้ Method remove ให้รับ user เข้ามาเช็ค
  async remove(id: string, user: any) {
    // หาใบลาใบนั้นก่อน
    const leave = await this.leaveModel.findById(id);
    if (!leave) {
      throw new NotFoundException('ไม่พบข้อมูลใบลา'); // ต้อง import NotFoundException
    }

    // 👮‍♂️ กฎเหล็ก: ถ้าไม่ใช่ Admin/Manager และ "ชื่อในใบลา ไม่ตรงกับ ชื่อคนลบ" -> ห้ามลบ!
    if (user.role !== 'admin' && user.role !== 'manager' && leave.userName !== user.fullName) {
      throw new ForbiddenException('คุณไม่มีสิทธิ์ลบใบลาของคนอื่น'); // ต้อง import ForbiddenException
    }

    // ถ้าผ่านกฎ ก็ลบได้เลย
    return this.leaveModel.findByIdAndDelete(id);
  }

}