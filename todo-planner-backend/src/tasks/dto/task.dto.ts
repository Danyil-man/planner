import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskPriorities } from '../enum';
import { Transform } from 'class-transformer';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsEnum(TaskPriorities)
  @IsOptional()
  @Transform(({ value }) => ('' + value).toLowerCase())
  priority?: TaskPriorities;
}
