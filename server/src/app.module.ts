import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TodoModule,
    MongooseModule.forRoot(`mongoDbConnectionlink`)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
