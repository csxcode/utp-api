import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { routes as routesBackoffice } from './apps/backoffice/routes'
import { routes as routesWeb } from './apps/web/routes'
import { AppModule as AppModuleBackoffice  } from './apps/backoffice/app.module'
import { AppModule as AppModuleWeb  } from './apps/web/app.module'

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        ConfigModule.forRoot(configService.getConfig()),        
        CoreModule,    

        // backoffice
        AppModuleBackoffice,
        RouterModule.forRoutes(routesBackoffice),        
        
        // web
        AppModuleWeb,
        RouterModule.forRoutes(routesWeb),                        
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
