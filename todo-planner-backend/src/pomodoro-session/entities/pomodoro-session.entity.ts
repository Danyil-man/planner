import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PomodoroSessionDocument = HydratedDocument<PomodoroSession>;

@Schema({ timestamps: true, versionKey: false })
export class PomodoroSession {
  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'PomodoroRound' }] })
  rounds: Types.ObjectId[];
}

export const PomodoroSessionSchema =
  SchemaFactory.createForClass(PomodoroSession);
