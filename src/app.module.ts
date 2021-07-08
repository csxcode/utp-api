import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { AuthModule } from './admin/auth/auth.module';
import { AuthModule as AuthModuleWeb } from './web/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { routes } from './routes';

@Module({
    imports: [RouterModule.forRoutes(routes), AuthModule, AuthModuleWeb],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
