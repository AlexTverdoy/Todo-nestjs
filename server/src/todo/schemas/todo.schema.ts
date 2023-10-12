import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>

@Schema()
export class Todo {
  @Prop()
  text: string
}

export const TodoSchema = SchemaFactory.createForClass(Todo);