import { Controller, Post } from '@nestjs/common';

@Controller()
export class AuthController {

  @Post('login')
  async login() {    
    return { message: 'success from admin', token: "123" };
  }

}
