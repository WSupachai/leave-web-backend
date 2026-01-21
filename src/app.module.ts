import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // 1. import ตรงนี้
import { LeavesModule } from './leaves/leaves.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 2. ใส่บรรทัดนี้เพื่อต่อ Database (ถ้าใช้ Docker ให้ใช้ url นี้เลย)
    MongooseModule.forRoot('mongodb+srv://supachaiwijaiya_db_user:3CCFZ783rlB7Pev8@cluster0.m00le1x.mongodb.net/leave-db/?appName=Cluster0'), 
    LeavesModule, UsersModule, AuthModule,
  ],
})
export class AppModule {}