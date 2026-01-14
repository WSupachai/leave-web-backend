import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ✅ เพิ่มบรรทัดนี้: อนุญาตให้ใครก็ได้ (หรือเฉพาะเว็บเรา) มาดึงข้อมูลได้
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
