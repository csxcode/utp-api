import { Routes } from 'nest-router';
import { AuthModule } from './auth/auth.module';

export const routes: Routes = [
    {
        path: '/admin/v1',
        children: [
            { path: '/auth', module: AuthModule },            
        ],
    },   
];
