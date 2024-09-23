import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TimeBlockDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNumber()
  @IsOptional()
  order: number;
}
