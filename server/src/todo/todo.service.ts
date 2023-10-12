import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {
  }

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = new this.todoModel(createTodoDto);
    return newTodo.save();
  }

  async findAll(page) {
    // Limit can be sent from frontend
    // Hardcoded in current implementation
    let limit = 5;
    let skip = (page > 0) ? (page - 1) * limit : 0;

    let total = await this.todoModel.countDocuments();
    let data = await this.todoModel.find().skip(skip).limit(limit).exec();
    return {
      data: data,
      pagination: { limit, skip, total }
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto);
  }

  async remove(id: string) {
    return this.todoModel.findByIdAndRemove(id);
  }
}
