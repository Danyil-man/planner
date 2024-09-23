import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TimeBlockDocument = HydratedDocument<TimeBlock>;

@Schema({ timestamps: true, versionKey: false })
export class TimeBlock {
  @Prop({ required: true })
  name: string;

  @Prop()
  color: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ default: 1 })
  order: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;
}

export const TimeBlockSchema = SchemaFactory.createForClass(TimeBlock);
