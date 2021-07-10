import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { AuthModule } from './admin/auth/auth.module';
import { AuthModule as AuthModuleWeb } from './web/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { routes } from './routes';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        ConfigModule.forRoot(configService.getConfig()),        
        RouterModule.forRoutes(routes),
        AuthModule,
        AuthModuleWeb,
        CoreModule,        
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
