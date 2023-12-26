import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { StockModule } from './stock/stock.module';


require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@imdb.72d8gkc.mongodb.net/?retryWrites=true&w=majority`), AuthModule, UserModule, StockModule],
  controllers: [AppController],
  providers:[
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ]
})
export class AppModule {}
