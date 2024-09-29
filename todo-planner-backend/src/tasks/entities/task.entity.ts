import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TaskPriorities } from '../enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ versionKey: false })
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: TaskPriorities })
  priority: TaskPriorities;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
