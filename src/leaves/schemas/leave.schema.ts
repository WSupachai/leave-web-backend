import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type LeaveDocument = HydratedDocument<Leave>;

@Schema({ timestamps: true }) // เพิ่ม timestamps จะได้รู้วันที่สร้างใบลา
export class Leave {
  //@Prop({ type: Types.ObjectId, ref: 'User', required: true })
  //user: User;

  // 1. เพิ่มประเภทการลา
  @Prop({ required: true })
  type: string;

  // 2. เพิ่มวันลา
  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop() // ไม่ required ก็ได้
  handoverPerson: string; // ชื่อคนรับมอบงาน

  @Prop({ required: true })
  reason: string;

  @Prop({ default: 'Pending' })
  status: string;

  // ✅ เพิ่มบรรทัดนี้แทน (เก็บเป็นชื่อตรงๆ)
  @Prop({ required: true })
  userName: string;

  //รูปแบบการลา (เต็มวัน, ครึ่งเช้า, ครึ่งบ่าย, ระบุเวลา)
  @Prop({
    enum: ['full', 'first_half', 'second_half', 'time_range'],
    default: 'full'
  })
  timeVariant: string;

  // เวลาเริ่ม (เช่น "09:00") - ใช้กรณีลาแบบ time_range
  @Prop()
  startTime: string;

  // เวลาจบ (เช่น "11:00")
  @Prop()
  endTime: string;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);