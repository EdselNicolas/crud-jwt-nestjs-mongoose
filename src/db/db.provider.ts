import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.createConnection('mongodb://localhost/nest', { useNewUrlParser: true }),
  },
];
