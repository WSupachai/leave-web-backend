import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // import
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';
import { Leave, LeaveSchema } from './schemas/leave.schema'; // import Schema

@Module({
  imports: [
    // จดทะเบียนว่า Module นี้ขอใช้ตาราง Leave นะ
    MongooseModule.forFeature([{ name: Leave.name, schema: LeaveSchema }]),
  ],
  controllers: [LeavesController],
  providers: [LeavesService],
})
export class LeavesModule {}