import { Controller, Get } from '@nestjs/common'; // запросы и ответы которые получает клиент
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
