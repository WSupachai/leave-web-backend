import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string; // ของจริงต้องเข้ารหัส (Hash) แต่วันนี้เก็บสดไปก่อนเพื่อความง่าย

  @Prop({ required: true, enum: ['user', 'manager', 'admin'], default: 'user' })
  role: string; // ตัวแบ่งชนชั้น: user, manager, admin

  @Prop()
  name: string; // ชื่อจริง
}

export const UserSchema = SchemaFactory.createForClass(User);