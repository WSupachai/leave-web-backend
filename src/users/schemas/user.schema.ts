import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string; // ใช้สำหรับ Login

  @Prop({ required: true })
  password: string; // เก็บแบบ Hash (เข้ารหัส) ห้ามเก็บ Text เปล่าๆ

  @Prop({ required: true })
  fullName: string; // ชื่อจริงที่ไว้แสดงในใบลา

  @Prop({ required: true, enum: ['admin', 'manager', 'employee'], default: 'employee' })
  role: string; // ตำแหน่ง: Admin(HR), Manager(หัวหน้า), Employee(พนักงาน)

  @Prop({ required: true })
  department: string; // แผนก เช่น IT, Sales, HR (เอาไว้กรองตอนอนุมัติ)
}

export const UserSchema = SchemaFactory.createForClass(User);