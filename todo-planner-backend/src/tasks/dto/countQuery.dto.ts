import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CountQueryDto {
  @IsOptional()
  @IsString()
  user_id?: string | Types.ObjectId;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsString()
  createdAt?: { $gte?: string; $lte?: string; $gt?: string; $lt?: string };
}
