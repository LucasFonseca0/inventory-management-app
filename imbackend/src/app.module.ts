import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

require('dotenv').config();


@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@imdb.72d8gkc.mongodb.net/?retryWrites=true&w=majority`), AuthModule],
})
export class AppModule {}
     