import { Controller, Dependencies, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@Dependencies(AppService)
export class AppController {
  constructor(appService) {
    this.appService = appService;
  }

  @Get()
  @Render('pages/home/page.marko')
  getHello() {
    return this.appService.getHello();
  }
}
