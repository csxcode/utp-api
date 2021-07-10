import { Routes } from 'nest-router';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

export const routes: Routes = [   
    {
        path: '/api/v1',
        children: [
            { path: '/auth', module: AuthModule },            
            { path: '/users', module: UserModule },    
        ],
    },
];
