import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK) // กำหนดให้ return 200 OK (ถ้าไม่ใส่จะเป็น 201 Created)
  @Post('login')
  async signIn(@Body() loginDto: LoginDto) {
    // 1. ตรวจสอบ Username/Password
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    
    // 2. ถ้าไม่ถูกต้อง ให้โยน Error ออกไป
    if (!user) {
      throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }

    // 3. ถ้าถูกต้อง ให้สร้าง Token ส่งกลับไป
    return this.authService.login(user);
  }
}