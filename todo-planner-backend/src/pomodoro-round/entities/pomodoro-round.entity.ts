import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PomodoroRoundDocument = HydratedDocument<PomodoroRound>;

@Schema({ timestamps: true, versionKey: false })
export class PomodoroRound {
  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ required: true })
  totalSeconds: number;

  @Prop({ type: Types.ObjectId, ref: 'PomodoroSession' })
  pomodoro_session_id: Types.ObjectId;
}

export const PomodoroRoundSchema = SchemaFactory.createForClass(PomodoroRound);
