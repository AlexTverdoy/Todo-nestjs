import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema, Todo } from './schemas/todo.schema';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema}
    ])
  ]
})
export class TodoModule {}
