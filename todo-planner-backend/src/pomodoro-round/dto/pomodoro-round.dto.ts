import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class PomodoroRoundDto {
  @IsNumber()
  @IsNotEmpty()
  totalSeconds: number;

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}
