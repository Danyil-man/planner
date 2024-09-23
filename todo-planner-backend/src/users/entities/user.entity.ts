import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 50 })
  workInterval: number;

  @Prop({ default: 10 })
  breakInterval: number;

  @Prop({ default: 7 })
  intervalsCount: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TimeBlock' }] })
  timeBlocks: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'PomodoroSession' }] })
  pomodoroSessions: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
