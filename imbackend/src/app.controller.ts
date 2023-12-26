// app.controller.ts
import { Controller, Get } from '@nestjs/common';

import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {


  

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
 