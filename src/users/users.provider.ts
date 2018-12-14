import { Connection } from 'mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UsersService } from './users.service';
export const UsersProviders = [
    {
        provide: 'UserModelToken',
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: ['DbConnectionToken'],
    },
];

export const UserServiceProvider = [
    {
        provide: 'UserServiceProvider',
        useValue: UsersService,
    },
];
