import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // 1. import ตรงนี้
import { LeavesModule } from './leaves/leaves.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 2. ใส่บรรทัดนี้เพื่อต่อ Database (ถ้าใช้ Docker ให้ใช้ url นี้เลย)
    MongooseModule.forRoot('mongodb://localhost:27017/leave-db'), 
    LeavesModule, UsersModule,
  ],
})
export class AppModule {}