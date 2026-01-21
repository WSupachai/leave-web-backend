import { IsString, IsNotEmpty, IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class CreateLeaveDto {
  
  @IsString()
  @IsOptional() // ✅ เปลี่ยนจาก IsNotEmpty เป็น IsOptional (เดี๋ยวเราเติมให้เอง)
  userName: string; 
  department: string;

  // ... fields อื่นๆ เหมือนเดิม
}