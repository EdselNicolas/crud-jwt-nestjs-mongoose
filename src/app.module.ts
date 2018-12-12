import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      // debug: false,
      // playground: false,
    }),
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
