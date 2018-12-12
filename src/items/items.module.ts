import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemsProviders } from './items.provider';
import { DatabaseModule } from '../db/db.module';
@Module({
  imports: [DatabaseModule],
  controllers: [ItemsController],
  providers: [
      ItemsService,
      ...ItemsProviders,
    ],
})
export class ItemsModule {}
