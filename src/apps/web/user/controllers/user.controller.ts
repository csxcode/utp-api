import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {

    @Get('profile')
    async profile() {    
      return { message: 'this is my profile from web user'};
    }  

}
