import { Routes } from 'nest-router';
import { AuthModule } from './apps/admin/auth/auth.module';
import { AuthModule as AuthModuleWeb } from './apps/web/auth/auth.module';

export const routes: Routes = [
    {
        path: '/admin/v1',
        children: [
            { path: '/auth', module: AuthModule },            
        ],
    },
    {
        path: '/api/v1',
        children: [
            { path: '/auth', module: AuthModuleWeb },            
        ],
    },
];
