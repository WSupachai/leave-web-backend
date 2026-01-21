import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Request } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { AuthGuard } from '@nestjs/passport'; // import AuthGuard
import { CreateLeaveDto } from './dto/create-leave.dto';

// 🔒 แปะป้ายตรงนี้: แปลว่า "ทุก Route ในไฟล์นี้ ต้องมี Token เท่านั้นถึงจะเข้าได้"
//@UseGuards(AuthGuard('jwt'))
@Controller('leaves') // ใครเข้าลิงก์ /leaves จะมาที่นี่
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) { }

  // POST /leaves (พนักงานส่งใบลา)
 @Post()
  create(@Body() createLeaveDto: CreateLeaveDto, @Request() req) {
    // 1. ดึงชื่อใส่ (เหมือนเดิม)
    createLeaveDto.userName = req.user.fullName; 

    // 2. ✅ ดึงแผนกจาก User ใส่ลงในใบลา (เพิ่มใหม่)
    createLeaveDto.department = req.user.department; 

    return this.leavesService.create(createLeaveDto);
  }

  // GET /leaves (ดูประวัติการลาทั้งหมด)
  @Get()
  findAll(@Request() req) {
    // ส่ง req.user (ข้อมูลคน Login) ไปให้ Service กรอง
    return this.leavesService.findAll(req.user);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string
  ) {
    return this.leavesService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) { // รับ req มาด้วย
    return this.leavesService.remove(id, req.user); // ส่ง user ไปให้ service เช็ค
  }

  

}