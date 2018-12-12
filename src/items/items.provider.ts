import { Connection } from 'mongoose';
import { ItemSchema } from './schemas/item.schema';

export const ItemsProviders = [
  {
    provide: 'ItemModelToken',
    useFactory: (connection: Connection) => connection.model('Item', ItemSchema),
    inject: ['DbConnectionToken'],
  },
];
