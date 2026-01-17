import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeavesService } from './leaves.service';

@Controller('leaves') // ใครเข้าลิงก์ /leaves จะมาที่นี่
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) { }

  // POST /leaves (พนักงานส่งใบลา)
  @Post()
  create(@Body() body: any) {
    // ส่งข้อมูล body ไปให้ Service ทำงานต่อ
    return this.leavesService.create(body);
  }

  // GET /leaves (ดูประวัติการลาทั้งหมด)
  @Get()
  findAll() {
    return this.leavesService.findAll();
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string
  ) {
    return this.leavesService.updateStatus(id, status);
  }

  @Delete(':id')  
  remove(@Param('id') id: string) {
    return this.leavesService.remove(id);
  }

}