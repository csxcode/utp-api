import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';

require('dotenv').config();

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {}

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('APP_ENV', false);
        return mode != 'dev';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.getValue('DB_HOST'),
            port: parseInt(this.getValue('DB_PORT')),
            username: this.getValue('DB_USERNAME'),
            password: this.getValue('DB_PASSWORD'),
            database: this.getValue('DB_DATABASE'),
            entities: ['dist/**/*.entity{.ts,.js}'],
            migrationsRun: true,
            migrations: [join(__dirname, '../database/migrations/*{.ts,.js}')],
            migrationsTableName: 'migrations',            
            cli: {
                migrationsDir: 'src/database/migrations',
            },
            synchronize: false,
            ssl: this.isProduction(),
        };
    }

    public getConfig(): any {
        return {
            isGlobal: true,
            envFilePath: `.env${process.env.NODE_ENV ? '' : `.${process.env.NODE_ENV}`}`,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('dev', 'qa', 'production')
                    .default('dev')                
            }),
        };
    }
}

const configService = new ConfigService(process.env).ensureValues([
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_DATABASE',
]);

export { configService };
