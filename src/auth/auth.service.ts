import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // 1. ฟังก์ชันตรวจสอบว่า User/Pass ถูกไหม
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    
    // ถ้าเจอ User และ รหัสผ่านตรงกัน (ใช้ bcrypt compare)
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject(); // ตัด password ทิ้งก่อนส่งกลับ
      return result;
    }
    return null;
  }

  // 2. ฟังก์ชัน Login เพื่อสร้าง Token
  async login(user: any) {
    // ข้อมูลที่จะฝังไว้ใน Token (Payload)
    const payload = { 
      username: user.username, 
      sub: user._id, 
      role: user.role,        // ✅ สำคัญ: ฝัง Role ไปด้วย
      department: user.department, // ✅ สำคัญ: ฝังแผนกไปด้วย
      fullName: user.fullName
    };

    return {
      access_token: this.jwtService.sign(payload), // สร้าง Token
    };
  }
}