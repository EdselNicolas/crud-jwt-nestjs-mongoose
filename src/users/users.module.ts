import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersProviders } from './users.provider';
import { DatabaseModule } from '../db/db.module';
@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
      UsersService,
      ...UsersProviders,
    ],
  exports: [UsersService],
})
export class UsersModule {}
