import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. ให้ดึง Token มาจาก Header ที่ชื่อ Authorization: Bearer ...
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // ห้ามใช้ Token ที่หมดอายุ
      secretOrKey: jwtConstants.secret, // ใช้กุญแจลับตัวเดิมในการเช็คลายเซ็น
    });
  }

  // 2. ถ้า Token ถูกต้อง ฟังก์ชันนี้จะทำงาน
async validate(payload: any) {
  return { 
    userId: payload.sub, 
    username: payload.username, 
    role: payload.role,
    department: payload.department,
    fullName: payload.fullName // ✅ เพิ่มบรรทัดนี้
  };
}
}